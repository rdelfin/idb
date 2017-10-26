import urllib.request
import re
from bs4 import BeautifulSoup

class PhoneDBScraper :

    def getPhones(self):
        raise NotImplementedError
    """
        url = "http://www.gsmarena.com/makers.php3"
        page = urllib2.urlopen(url)
        soup = BeautifulSoup(page, "lxml")
        
        phones = []
        makers = soup.find_all('td')
        for maker in makers:
            url = "http://www.gsmarena.com/" + str(maker).split('\"')[1]
            page = urllib2.urlopen(url)
            soup = BeautifulSoup(page, "lxml")
        
            makers_div = str(soup.find_all('div', class_='makers')[0])
            maker_soup = BeautifulSoup(makers_div, "lxml")
            phones_per_maker = maker_soup.find_all('li')
        
            if len(soup.find_all('div', class_='nav-pages')) > 0: # if there's a nav page for the phones
                nav_div = str(soup.find_all('div', class_='nav-pages')[0])
                nav_soup = BeautifulSoup(nav_div, "lxml")
                for pages in nav_soup.find_all('a'):
                    url = "http://www.gsmarena.com/" + str(pages).split('\"')[1]
                    page = urllib2.urlopen(url)
                    soup = BeautifulSoup(page, "lxml")
        
                    makers_div = str(soup.find_all('div', class_='makers')[0])
                    maker_soup = BeautifultaSoup(makers_div, "lxml")
                    phones_per_maker += maker_soup.find_all('li')
        
            for phone in phones_per_maker:
                url = "http://www.gsmarena.com/" + str(phone).split('\"')[1]
                print(url)
        return soup.find_all('td')
    """
    def getCarriers (self):
        url = "http://phonedb.net/index.php?m=vendor&s=list"
        page = urllib.request.urlopen(url)
        soup = BeautifulSoup(page, 'html.parser')

        carriers = []

        title_blocks = soup.find_all(lambda tag: tag.has_attr('class') and re.compile("content_block_title").search(str(tag.get('class'))))

        for title in title_blocks:
            link = next(title.children)
            carrier_name = link.get('title')
            carrier_url = urllib.request.urlopen(url + link.get('href'))
            sub_soup = BeautifulSoup(carrier_url, 'html.parser')

            info_table = sub_soup.find(lambda tag: tag.name == 'table' and re.compile("width : 98%; margin : 2px;").search(str(tag.get('style'))))
            for table_row in info_table.find_all('td'):
                print(table_row)
            break

        raise NotImplementedError

if __name__ == "__main__":
    pdadb = PhoneDBScraper()
    pdadb.getCarriers()
