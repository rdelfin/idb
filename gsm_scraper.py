import urllib2

from bs4 import BeautifulSoup

class GSMScraper() :

	def getPhones(self):
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
					maker_soup = BeautifulSoup(makers_div, "lxml")
					phones_per_maker += maker_soup.find_all('li')

			for phone in phones_per_maker:
				url = "http://www.gsmarena.com/" + str(phone).split('\"')[1]
				print(url)
		return soup.find_all('td')


gsm = GSMScraper()
gsm.getPhones()