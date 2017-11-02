import urllib.request
import re
from bs4 import BeautifulSoup
import app.models
import pickle


class PhoneDBScraper :
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
                                         and re.compile("content_block_title").search(str(tag.get('class'))))

            general_attr_map = {
                'Model': 'model',
                'Brand': 'brand',
                'Released': 'release_date',
                'Hardware Designer': 'hardware_designer',
                'Manufacturer': 'manufacturers',
                'Codename': 'codename',
                'Market Countries': 'market_countries',
                'Market Regions': 'market_regions',
                'Vendor': 'carriers',
            }

            physical_attr_map = {}
            hardware_attr_map = {}
            software_attr_map = {}
            display_attr_map = {}
            cameras_attr_map = {}

            attr_map_map = {}

            order_in_page = 1
            for title in title_blocks:
                print("Processing phone %d" % (0 + order_in_page))
                order_in_page += 1
                link = next(title.children)
                phone_name = link.get('title')
                phone_url = urllib.request.urlopen(url + link.get('href'))
                sub_soup = BeautifulSoup(phone_url, 'html.parser')

                phone_image = sub_soup.find(lambda tag: tag.name == 'img' and
                                            tag.get('alt') == phone_name)

                if phone_image:
                    phone_image = url + phone_image.get('src')

                info_table = sub_soup.find(lambda tag: tag.name == 'table' and
                                           re.compile("width : 98%; margin : 2px;").search(str(tag.get('style'))))

                table_rows = info_table.find_all('td')
                attributes = {}
                i = 0
                current_section = ''
                while i < len(table_rows):
                    row = table_rows[i]
                    try:
                        dim = next(row.children)
                    except StopIteration:
                        pass
                    attr_name = row.find('strong')
                    if attr_name:
                        attr_name = next(attr_name.children)
                        attr_content = table_rows[i+1].find_all(lambda tag: tag.has_attr('title')
                                                                and all(str(type(tag)) ==
                                                                        "<class 'bs4.element.NavigableString'>"
                                                                        or not tag.name == 'img'
                                                                        for tag in tag.children))

                        if len(attr_content) == 1:
                            c = attr_content[0]
                            if c.name == 'a':
                                c = next(c.children)
                            attributes[attr_name] = c
                        else:
                            attributes[attr_name] = []
                            for c in attr_content:
                                if c.name == 'a':
                                    c = next(c.children)
                                attributes[attr_name] += c
                        i += 2
                        if attr_name == 'Mass':
                            i += 2
                    elif dim == 'Dimensions':
                        attributes[dim] = table_rows[i+1].contents[1]
                        i += 2
                    else:
                        section_tag = row.find('img')
                        if section_tag:
                            current_section = section_tag.get('title')
                        i += 1

                attributes = {general_attr_map[key]: attributes[key]
                              for key in attributes if key in general_attr_map}

                self.phones += [app.models.Model(image=phone_image, **attributes)]
            return self.phones
        raise NotImplementedError

    def get_carriers (self):
        if not self.carriers:
            self.carriers = []
            for n in range(0, 28 * 4, 28):
                page_suffix = "" if n == 0 else "&filter=%d" % (n)
                url = "http://phonedb.net/index.php?m=vendor&s=list" + page_suffix
                page = urllib.request.urlopen(url)
                soup = BeautifulSoup(page, 'html.parser')

                title_blocks = soup.find_all(lambda tag: tag.has_attr('class')
                                             and re.compile("content_block_title").search(str(tag.get('class'))))

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
                                               re.compile("width : 98%; margin : 2px;").search(str(tag.get('style'))))

                    table_rows = info_table.find_all('td')
                    attributes = {}
                    i = 0
                    while i < len(table_rows):
                        row = table_rows[i]
                        attr_name = row.find('strong')
                        if attr_name:
                            attr_name = next(attr_name.children)
                            attr_content = table_rows[i+1].contents[1]
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
