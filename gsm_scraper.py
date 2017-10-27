import urllib.request
from bs4 import BeautifulSoup
from app import models
from app import inserter

def find_info(s, phone_info) :
		try :
			pos = next(x for x in range(len(phone_info)) if s in str(phone_info[x])) + 1
		except StopIteration :
			return None
		else :
			return str(phone_info[pos]).split('>')[1][:-4]

class GSMScraper() :

	def insertData(self):
		url = "http://www.gsmarena.com/makers.php3"
		page = urllib.request.urlopen(url)
		soup = BeautifulSoup(page, "lxml")

		phones = []
		brands = []
		oss = []
		makers = soup.find_all('td')
		for maker in makers:
			url = "http://www.gsmarena.com/" + str(maker).split('\"')[1]
			page = urllib.request.urlopen(url)
			soup = BeautifulSoup(page, "lxml")

			brand = str(maker).split('\"')[1].split('-')[0].capitalize()
			print(brand)

			makers_div = str(soup.find_all('div', class_='makers')[0])
			maker_soup = BeautifulSoup(makers_div, "lxml")
			phones_per_maker = maker_soup.find_all('li')

			brand_models = []
			brand_oss = []

			if len(soup.find_all('div', class_='nav-pages')) > 0: # if there's a nav page for the phones
				nav_div = str(soup.find_all('div', class_='nav-pages')[0])
				nav_soup = BeautifulSoup(nav_div, "lxml")
				for pages in nav_soup.find_all('a'):
					url = "http://www.gsmarena.com/" + str(pages).split('\"')[1]
					page = urllib.request.urlopen(url)
					soup = BeautifulSoup(page, "lxml")

					makers_div = str(soup.find_all('div', class_='makers')[0])
					maker_soup = BeautifulSoup(makers_div, "lxml")
					phones_per_maker += maker_soup.find_all('li')

			for phone in phones_per_maker:
				url = "http://www.gsmarena.com/" + str(phone).split('\"')[1]
				page = urllib.request.urlopen(url)
				soup = BeautifulSoup(page, "lxml")

				phone_info = soup.find_all('td')
				try :
					image = str(soup.find('div', class_="specs-photo-main")).split('\"')[7]
				except IndexError : 
					image = None
				name = str(soup.find('h1', class_="specs-phone-name-title")).split('>')[1][:-4]
				model = name
				release_date = find_info('Status', phone_info)
				# print(image)
				# print(name)
				# print(release_date)
				
				hardware_designer = brand
				manufacturers = [hardware_designer]
				codename = None
				market_countries = []
				market_regions = []
				carriers = None
				dimensions = find_info('Dimensions', phone_info)
				mass = find_info('Weight', phone_info)
				# print(dimensions)
				# print(mass)
				physical_attributes = models.PhysicalAttributes(None, None, None, dimensions, mass)

				software_os = find_info('OS', phone_info)
				for os in oss:
					if os.name == software_os:
						os.models.append(name)
					if brand not in os.brands :
						os.brands.append(brand)
				else : 
					oss.append(models.OS(None, software_os, None, None, None, None, None, [], None, [], [], None, None))
				software = models.Software(software_os, software_os, [])
				# print(os)
				
				cpu_model = find_info('CPU', phone_info)
				cpu = models.Cpu(cpu_model, [], None)
				gpu_model = find_info('GPU', phone_info)
				gpu = models.Gpu(gpu_model, None)
				internal = find_info('Internal', phone_info)
				try :
					ram_capacity = str(internal).split(",")[1][1:-4]
				except IndexError :
					ram_capacity = None
				ram = models.Ram(None, ram_capacity)
				nonvolatile_memory_capacity = str(internal).split(",")[0]
				nonvolatile_memory = models.NonvolatileMemory(None, nonvolatile_memory_capacity)
				hardware = models.Hardware(cpu, gpu, ram, nonvolatile_memory)
				# print(cpu_model)
				# print(gpu_model)
				# print(ram_capacity)
				# print(nonvolatile_memory_capacity)

				resolution = find_info('Resolution', phone_info)
				display_resolution = str(resolution).split("(")[0]
				display_diagonal = find_info('Size', phone_info)
				try :
					display_pixel_density = str(resolution).split("(")[1][:-9]
				except IndexError :
					display_pixel_density = None
				dtype = find_info('Type', phone_info)
				display_type = str(dtype).split(",")[0]
				try:
					display_color_depth = str(dtype).split(",")[1][1:]
				except IndexError :
					display_color_depth = None
				display = models.Display(display_resolution, display_diagonal, None, None, None, None, 
										 display_diagonal, display_type, display_color_depth, None)
				# print(display_resolution)
				# print(display_diagonal)
				# print(display_pixel_density)
				# print(display_type)
				# print(display_color_depth)

				primary = find_info("Primary", phone_info)
				primary_num_pixels = str(primary).split(",")[0]
				primary_placement = "Rear"
				secondary = find_info("Secondary", phone_info)
				secondary_num_pixels = str(secondary).split(",")[0]
				secondary_placement = "Front"
				cameras = []
				if (primary) :
					cameras.append(models.Camera(primary_placement, None, None, None, None, primary_num_pixels, 
								   None, None, None, None, models.Camcorder(None, None), None))
				if (secondary) :
					cameras.append(models.Camera(secondary_placement, None, None, None, None, secondary_num_pixels, 
								   None, None, None, None, models.Camcorder(None, None), None))
				# print(primary_num_pixels)
				# print(secondary_num_pixels)

				phone = models.Model(image, name, brand, model, release_date,
							  hardware_designer, manufacturers, codename, market_countries,
							  market_regions, carriers, physical_attributes, hardware, 
							  software, display, cameras)
				phones.append(phone)

				brand_models.append(name)
				for os in oss :
					if brand not in os.brands : 
						brand_oss.append(software_os)
				break

			
			print(brand_models)
			print(brand_oss)
			brands.append(models.Brand(None, brand, None, [], None, [], None, brand_models, [], brand_oss, [], None))
			break
	
		inserter.insert_all(models = phones, brands = brands, oss = oss, carriers = [])


gsm = GSMScraper()
gsm.insertData()