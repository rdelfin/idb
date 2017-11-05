import urllib.request
import re

import builtins
from bs4 import BeautifulSoup
import app.models
import pickle
import time
import sys
import random

os_attr_map = {
    'Developer': 'developer',
    'Released': 'release_date',
    'Full Name': 'name',
    'Version': 'short_name',
    'Codename': 'codename',
    'Operating System Kernel': 'os_kernel',
    'Operating System Family': 'os_family',
    'Supported CPU Instruction Set(s)': 'supported_cpu_instruction_sets'
}


def choose_appropriate_content(tag):
    if str(type(tag)) == "<class 'bs4.element.NavigableString'>":
        return True
    elif tag.has_attr('title') and tag.name != 'img':
        if all(str(type(sub)) == "<class 'bs4.element.NavigableString'>"
               for sub in tag.children):
            return True


def os_scrape(os_link, phone_brand, phone_model):
    page = urllib.request.urlopen(os_link)
    soup = BeautifulSoup(page, 'html.parser')

    attr = {}

    table = soup.find(lambda tag: tag.name == 'table'
                      and re.compile('width : 98%; margin : 2px')
                      .search(str(tag.get('style'))))

    table_rows = table.find_all('tr')
    for row in table_rows:
        row_contents = row.contents

        if len(row_contents) == 5:
            key = row_contents[1]
            val = row_contents[3]
            attr_name = key.find('strong')
            if not attr_name:
                attr_name = key
            try:
                attr_name = next(attr_name.children)
            except StopIteration:
                continue

            attr_name = attr_name.encode().decode()

            if attr_name in os_attr_map:
                attr_content = [tag for tag in val.children if choose_appropriate_content(tag)]

                if len(attr_content) < 1:
                    attr[attr_name.encode().decode()] = None
                elif attr_name == 'Operating System Family' or len(attr_content) == 1:
                    c = attr_content[0]
                    if c.name == 'a':
                        c = next(c.children)
                    attr[os_attr_map[attr_name]] = c.encode().decode().strip()
                else:
                    attr[os_attr_map[attr_name]] = []
                    for c in attr_content:
                        if c.name == 'a':
                            c = next(c.children)
                        if c != ', ':
                            attr[os_attr_map[attr_name]] += [c.encode().decode().strip()]
    return app.models.OS(brands={phone_brand}, models=[phone_brand + ' ' + phone_model], **attr)


class PhoneDBScraper:
    def __init__(self):
        self.phones = None
        self.oss = {}
        self.carriers = {}
        self.brands = {}
        self.model_limit = None
        self.model_rand = None

    def get_phones(self):
        if not self.phones:
            time_start = time.time()
            general_attr_map = {
                'Model': 'model',
                'Brand': 'brand',
                'Released': 'release_date',
                'Hardware Designer': 'hardware_designer',
                'Manufacturer': 'manufacturers',
                'Codename': 'codename',
                'Market Countries': 'market_countries',
                'Market Regions': 'market_regions',
                'Vendor': 'carriers'
            }

            physical_attr_map = {
                'Width': 'width',
                'Height': 'height',
                'Depth': 'depth',
                'Dimensions': 'dimensions',
                'Mass': 'mass'
            }

            hardware_attr_map = {
                'CPU Clock': 'cpu__clock_speed',
                'CPU': 'cpu__model_additional',
                'RAM Type': 'ram__type_m',
                'RAM Capacity (converted)': 'ram__capacity',
                'Non-volatile Memory Type': 'nvm__type_m',
                'Non-volatile Memory Capacity (converted)': 'nvm__capacity',
                'Graphical Controller': 'gpu__model',
                'GPU Clock': 'gpu__clock_speed'
            }

            software_attr_map = {
                'Platform': 'platform',
                'Operating System': 'os',
                'Software Extras': 'software_extras'
            }

            display_attr_map = {
                'Display Resolution': 'resolution',
                'Display Diagonal': 'diagonal',
                'Horizontal Full Bezel Width': 'bezel_width',
                'Display Area Utilization': 'area_utilization',
                'Pixel Density': 'pixel_density',
                'Display Type': 'type_m',
                'Width': 'width',
                'Height': 'height',
                'Color Depth': 'color_depth',
                'Scratch Resistant Screen': 'screen'
            }

            cameras_attr_map = {
                'Camera Placement': 'placement',
                'Camera Module': 'module',
                'Camera Image Sensor': 'sensor',
                'Image Sensor Format': 'sensor_format',
                'Number of pixels': 'num_pixels',
                'Aperture (W)': 'aperture',
                'Optical Zoom': 'optical_zoom',
                'Digital Zoom': 'digital_zoom',
                'Focus': 'focus',
                'Camcorder Resolution': 'camcorder__resolution',
                'Camcorder Formats': 'camcorder__formats',
                'Secondary Camera Placement': 'secondary__placement',
                'Secondary Camera Module': 'secondary__module',
                'Secondary Camera Image Sensor': 'secondary__sensor',
                'Secondary Image Sensor Format': 'secondary__sensor_format',
                'Secondary Number of pixels': 'secondary__num_pixels',
                'Secondary Aperture (W)': 'secondary__aperture',
                'Secondary Optical Zoom': 'secondary__optical_zoom',
                'Secondary Digital Zoom': 'secondary__digital_zoom',
                'Secondary Focus': 'secondary__focus',
                'Secondary Camcorder Resolution': 'secondary__camcorder__resolution',
                'Secondary Camcorder Formats': 'secondary__camcorder__formats'
            }

            attr_map_map = {
                'General Attributes': general_attr_map,
                'Physical Attributes': physical_attr_map,
                'Graphical Subsystem': hardware_attr_map,
                'Software Environment': software_attr_map,
                'Application processor, Chipset': hardware_attr_map,
                'Operative Memory': hardware_attr_map,
                'Non-volatile Memory': hardware_attr_map,
                'Display': display_attr_map,
                'Built-in Digital Camera': cameras_attr_map,
                'Built-in Secondary Digital Camera': cameras_attr_map
            }

            per_page = 58
            pages = (12470 // per_page) + 1

            self.phones = []
            for n in range(0, per_page * pages, per_page):
                if self.model_limit:
                    if n > self.model_limit:
                        break
                page_suffix = "" if n == 0 else '&filter=%d' % n
                url = "http://phonedb.net/index.php?m=device&s=list" + page_suffix
                page = urllib.request.urlopen(url)
                soup = BeautifulSoup(page, 'html.parser')

                title_blocks = soup.find_all(lambda tag: tag.has_attr('class')
                                             and re.compile("content_block_title")
                                             .search(str(tag.get('class'))))

                order_in_page = 0
                for title in title_blocks:
                    order_in_page += 1
                    if self.model_limit:
                        if n + order_in_page > self.model_limit:
                            break
                    if self.model_rand:
                        r = random.randint(1, self.model_rand)
                        if r != 1:
                            continue
                    print("Processing phone %5d" % (n + order_in_page), end='')

                    link = next(title.children)
                    phone_name = link.get('title')
                    phone_url = urllib.request.urlopen(url + link.get('href'))
                    sub_soup = BeautifulSoup(phone_url, 'html.parser')

                    phone_general_attributes = {}
                    phone_physical_attributes = {}
                    phone_hardware_attributes = {}
                    phone_software_attributes = {}
                    phone_display_attributes = {}
                    phone_camera_attributes = {}

                    phone_image = sub_soup.find(lambda tag: tag.name == 'img' and
                                                tag.get('alt') == phone_name)

                    section_attributes_mapping = {
                        'General Attributes': phone_general_attributes,
                        'Physical Attributes': phone_physical_attributes,
                        'Software Environment': phone_software_attributes,
                        'Display': phone_display_attributes,
                        'Built-in Digital Camera': phone_camera_attributes,
                        'Built-in Secondary Digital Camera': phone_camera_attributes,
                        'Graphical Subsystem': phone_hardware_attributes,
                        'Application processor, Chipset': phone_hardware_attributes,
                        'Operative Memory': phone_hardware_attributes,
                        'Non-volatile Memory': phone_hardware_attributes
                    }

                    if phone_image:
                        phone_image = url + phone_image.get('src')

                    info_table = sub_soup.find(lambda tag: tag.name == 'table'
                                               and re.compile("width : 98%; margin : 2px;").search(
                                                               str(tag.get('style'))))

                    table_rows = info_table.find_all('tr')
                    current_section = ''
                    for row in table_rows:
                        row_contents = row.contents

                        if len(row_contents) == 3:
                            # This is a section header
                            section_tag = row.find('img')
                            if section_tag:
                                current_section = section_tag.get('title')
                        elif len(row_contents) == 5:
                            # This is a data row
                            if current_section not in attr_map_map:
                                continue
                            key = row_contents[1]
                            val = row_contents[3]
                            attr_name = key.find('strong')
                            if not attr_name:
                                attr_name = key
                            try:
                                attr_name = next(attr_name.children)
                            except StopIteration:
                                continue

                            attr_name = attr_name.encode().decode()

                            if attr_name in attr_map_map[current_section]:
                                attributes = section_attributes_mapping[current_section]

                                attr_content = [tag for tag in val.children if choose_appropriate_content(tag)]

                                if len(attr_content) < 1:
                                    attributes[attr_name] = None
                                elif len(attr_content) == 1:
                                    c = attr_content[0]
                                    if c.name == 'a':
                                        if attr_name == 'Operating System':
                                            os_link = 'http://phonedb.net/' + c.get('href')
                                            c = next(c.children)
                                            str_os = c.encode().decode()
                                            if str_os not in self.oss:
                                                self.oss[str_os] = os_scrape(os_link,
                                                                             phone_general_attributes['brand'],
                                                                             phone_general_attributes['model'])
                                            else:
                                                self.oss[str_os].brands |= {phone_general_attributes['brand']}
                                                self.oss[str_os].models += [phone_general_attributes['brand']
                                                                            + ' '
                                                                            + phone_general_attributes['model']]
                                        else:
                                            c = next(c.children)
                                    attributes[attr_map_map[current_section][attr_name]] = c.encode().decode().strip()
                                else:
                                    attributes[attr_map_map[current_section][attr_name]] = []
                                    for c in attr_content:
                                        if c.name == 'a':
                                            if attr_name == 'Vendor':
                                                pass
                                            c = next(c.children)
                                        if c != ', ':
                                            attributes[attr_map_map[current_section][attr_name]] += \
                                                [c.encode().decode().strip()]
                        else:
                            pass
                    # General
                    name = phone_general_attributes['brand'] + ' ' + phone_general_attributes['model']
                    print(': %s' % name)

                    # Physical Attributes
                    physical = app.models.PhysicalAttributes(**phone_physical_attributes)

                    # Hardware
                    cpu_attr = {}
                    gpu_attr = {}
                    ram_attr = {}
                    nvm_attr = {}

                    for k in phone_hardware_attributes:
                        if len(k) < 5:
                            continue
                        v = phone_hardware_attributes[k]
                        if k[:5] == 'cpu__':
                            k = k[5:]
                            cpu_attr[k] = v
                        elif k[:5] == 'gpu__':
                            k = k[5:]
                            gpu_attr[k] = v
                        elif k[:5] == 'ram__':
                            k = k[5:]
                            ram_attr[k] = v
                        elif k[:5] == 'nvm__':
                            k = k[5:]
                            nvm_attr[k] = v

                    mod_addl = 'model_additional'
                    if mod_addl in cpu_attr:
                        v = cpu_attr[mod_addl]
                        cpu_attr.pop(mod_addl)
                        v = v.split(', ')
                        cpu_attr['model'] = v[0]
                        cpu_attr['additional_info'] = v[1:-1]

                    cpu = app.models.Cpu(**cpu_attr) if cpu_attr != {} else None
                    gpu = app.models.Gpu(**gpu_attr) if gpu_attr != {} else None
                    ram = app.models.Ram(**ram_attr) if ram_attr != {} else None
                    nvm = app.models.NonvolatileMemory(**nvm_attr) if nvm_attr != {} else None

                    hardware = app.models.Hardware(cpu, gpu, ram, nvm)

                    # Software
                    software = app.models.Software(**phone_software_attributes)

                    # Display
                    display = app.models.Display(**phone_display_attributes)

                    # Cameras
                    cameras = []
                    primary_camera_attr = {}
                    primary_camcorder_attr = {}
                    secondary_camera_attr = {}
                    secondary_camcorder_attr = {}

                    for k in phone_camera_attributes:
                        v = phone_camera_attributes[k]
                        if len(k) >= 11 and k[:11] == 'secondary__':
                            k = k[11:]
                            if len(k) >= 11 and k[:11] == 'camcorder__':
                                k = k[11:]
                                secondary_camcorder_attr[k] = v
                            else:
                                secondary_camera_attr[k] = v
                        else:
                            if len(k) >= 11 and k[:11] == 'camcorder__':
                                k = k[11:]
                                primary_camcorder_attr[k] = v
                            else:
                                primary_camera_attr[k] = v

                    pri_camcorder = app.models.Camcorder(**primary_camcorder_attr) \
                        if primary_camcorder_attr != {} else None
                    sec_camcorder = app.models.Camcorder(**secondary_camcorder_attr) \
                        if secondary_camcorder_attr != {} else None

                    cameras += [app.models.Camera(camcorder=pri_camcorder, **primary_camera_attr)]

                    if sec_camcorder or secondary_camera_attr != {}:
                        cameras += [app.models.Camera(camcorder=sec_camcorder, **secondary_camera_attr)]

                    self.phones += [app.models.Model(name=name, image=phone_image, physical_attributes=physical,
                                                     software=software, display=display, cameras=cameras,
                                                     hardware=hardware,
                                                     **phone_general_attributes)]
                    # break
                # break
            time_end = time.time()
            time_elapsed = time_end - time_start
            elapsed_minutes = time_elapsed // 60
            elapsed_seconds = time_elapsed % 60
            print("Finished processing phones. Time elapsed: %dm %ds" % (elapsed_minutes, elapsed_seconds))
            with open('phones.pickle', 'wb') as f:
                print('Dumping phone pickle')
                pickle.dump(self.phones, f)
                print('Done.')
            with open('oss.pickle', 'wb') as f:
                print('Dumping os pickle')
                pickle.dump(self.oss, f)
                print('Done.')
            return self.phones
        return self.phones

    def get_carriers(self):
        if not self.carriers:
            self.carriers = []
            for n in range(0, 28 * 4, 28):
                page_suffix = "" if n == 0 else "&filter=%d" % n
                url = "http://phonedb.net/index.php?m=vendor&s=list" + page_suffix
                page = urllib.request.urlopen(url)
                soup = BeautifulSoup(page, 'html.parser')

                title_blocks = soup.find_all(lambda tag: tag.has_attr('class')
                                                         and re.compile("content_block_title").search(
                    str(tag.get('class'))))

                attr_name_map = {
                    'Model': 'name',
                    'Short name': 'short_name',
                    'Cellular Networks Installed': 'cellular_networks',
                    'Covered Countries': 'covered_countries'
                }

                order_in_page = 1
                for title in title_blocks:
                    print("Processing carrier %d" % (n + order_in_page))
                    order_in_page += 1
                    link = next(title.children)
                    carrier_name = link.get('title')
                    carrier_url = urllib.request.urlopen(url + link.get('href'))
                    sub_soup = BeautifulSoup(carrier_url, 'html.parser')

                    carrier_image = sub_soup.find(lambda tag: tag.name == 'img' and tag.get('alt') == carrier_name)

                    if carrier_image:
                        carrier_image = url + carrier_image.get('src')

                    info_table = sub_soup.find(lambda tag: tag.name == 'table' and
                                                           re.compile("width : 98%; margin : 2px;").search(
                                                               str(tag.get('style'))))

                    table_rows = info_table.find_all('td')
                    attributes = {}
                    i = 0
                    while i < len(table_rows):
                        row = table_rows[i]
                        attr_name = row.find('strong')
                        if attr_name:
                            attr_name = next(attr_name.children)
                            attr_content = table_rows[i + 1].contents[1]
                            if attr_content.name == 'a':
                                attr_content = next(attr_content.children)
                            attributes[attr_name] = attr_content
                            i += 2
                        else:
                            i += 1

                    attributes = {attr_name_map[key]: attributes[key]
                                  for key in attributes if key in attr_name_map}

                    self.carriers += [app.models.Carrier(image=carrier_image, **attributes)]
        return self.carriers

    def stash_carriers(self, file):
        pickle.dump(self.get_carriers(), file)


if __name__ == "__main__":
    pdadb = PhoneDBScraper()
    # try:
    #     with open("carriers.pickle", 'rb') as inp:
    #         pdadb.carriers = pickle.load(inp)
    # except (EOFError, FileNotFoundError):
    #     with open("carriers.pickle", 'wb') as out:
    #         print("Getting carriers:")
    #         pdadb.get_carriers()
    #         print("Pickling carriers to %s" % out.name)
    #         pdadb.stash_carriers(out)
    #         print("Done.")
    # finally:
    #     result = pdadb.get_carriers()
    if len(sys.argv) > 1:
        if sys.argv[1] == 'random':
            pdadb.model_rand = int(sys.argv[2])
        else:
            pdadb.model_limit = int(sys.argv[1])
    else:
        pdadb.model_limit = None
        pdadb.model_rand = None
    phones = pdadb.get_phones()
