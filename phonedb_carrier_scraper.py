import urllib.request
import re

import builtins
from bs4 import BeautifulSoup
import app.models
import pickle


class PhoneDBScraper:
    def __init__(self):
        self.phones = None
        self.carriers = None
        self.brands = None

    def get_phones(self):
        if not self.phones:
            self.phones = []
            page_suffix = ""
            url = "http://phonedb.net/index.php?m=device&s=list" + page_suffix
            page = urllib.request.urlopen(url)
            soup = BeautifulSoup(page, 'html.parser')

            title_blocks = soup.find_all(lambda tag: tag.has_attr('class')
                                                     and re.compile("content_block_title")
                                         .search(str(tag.get('class'))))

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

            hardware_attr_map = {}

            software_attr_map = {
                'Platform': 'platform',
                'Operating System': 'os',
                'Software Extras': 'software_extras'
            }

            display_attr_map = {}
            cameras_attr_map = {}

            attr_map_map = {
                'General Attributes': general_attr_map,
                'Physical Attributes': physical_attr_map,
                'Hardware Attributes': hardware_attr_map,
                'Software Environment': software_attr_map,
                'Application processor, Chipset': hardware_attr_map,
                'Operative Memory': hardware_attr_map,
                'Non-volatile Memory': hardware_attr_map,
                'Display': display_attr_map,
                'Built-in Digital Camera': cameras_attr_map,
                'Built-in Secondary Digital Camera': cameras_attr_map
            }

            order_in_page = 1
            for title in title_blocks:
                print("Processing phone %d" % (0 + order_in_page))
                order_in_page += 1

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
                    'Software Environment': phone_software_attributes
                }

                if phone_image:
                    phone_image = url + phone_image.get('src')

                info_table = sub_soup.find(lambda tag: tag.name == 'table'
                                           and re.compile("width : 98%; margin : 2px;").search(
                                                           str(tag.get('style'))))

                table_rows = info_table.find_all('tr')
                # attributes = {}
                current_section = ''
                for row in table_rows:
                    row_contents = row.contents

                    if len(row_contents) == 3:
                        # This is a section header
                        section_tag = row.find('img')
                        if section_tag:
                            current_section = section_tag.get('title')
                    elif len(row_contents) == 5:
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
                        if attr_name in attr_map_map[current_section]:
                            attributes = section_attributes_mapping[current_section]

                            def choose_appropriate_content(tag):
                                if str(type(tag)) == "<class 'bs4.element.NavigableString'>":
                                    return True
                                elif tag.has_attr('title') and tag.name != 'img':
                                    if all(str(type(sub)) == "<class 'bs4.element.NavigableString'>"
                                           for sub in tag.children):
                                        return True

                            attr_content = [tag for tag in val.children if choose_appropriate_content(tag)]

                            if len(attr_content) < 1:
                                attributes[attr_name] = None
                            elif len(attr_content) == 1:
                                c = attr_content[0]
                                if c.name == 'a':
                                    c = next(c.children)
                                attributes[attr_map_map[current_section][attr_name]] = c.encode().decode().strip()
                            else:
                                attributes[attr_map_map[current_section][attr_name]] = []
                                for c in attr_content:
                                    if c.name == 'a':
                                        c = next(c.children)
                                    if c != ', ':
                                        attributes[attr_map_map[current_section][attr_name]] += \
                                            [c.encode().decode().strip()]
                    else:
                        pass

                # Physical Attributes
                physical = app.models.PhysicalAttributes(**phone_physical_attributes)

                # Hardware

                # Software
                software = app.models.Software(**phone_software_attributes)

                # Display

                # Cameras

                self.phones += [app.models.Model(image=phone_image, physical_attributes=physical,
                                                 software=software,
                                                 **phone_general_attributes)]
                break
            return self.phones
        raise self.phones

    def get_carriers(self):
        if not self.carriers:
            self.carriers = []
            for n in range(0, 28 * 4, 28):
                page_suffix = "" if n == 0 else "&filter=%d" % (n)
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
    phones = pdadb.get_phones()
