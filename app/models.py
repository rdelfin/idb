# This is where all of our model classes are defined

class Model:
    def __init__(self, image, name, brand, model, release_date,
                 hardware_designer, manufacturers, codename, market_countries,
                 market_regions, carriers, physical_attributes, software,
                 hardware, display, cameras):
        self.image = image
        self.name = name
        self.brand = brand
        self.model = model
        self.release_date = release_date
        self.hardware_designer = hardware_designer
        self.manufacturers = manufacturers
        self.codename = codename
        self.market_countries = market_countries
        self.market_regions = market_regions
        self.carriers = carriers
        self.physical_attributes = physical_attributes
        self.software = software
        self.hardware = hardware
        self.display = display
        self.cameras = cameras


class Brand:
    def __init__(self, image, name, type_m, industries, found_date, location,
                 area_served, phone_models, carriers, os, founders=None,
                 parent=None):
        self.image = image
        self.name = name
        self.type_m = type_m
        self.industries = industries
        self.found_date = found_date
        self.location = location
        self.area_served = area_served
        self.phone_models = phone_models
        self.carriers = carriers
        self.os = os
        self.founders = founders
        self.parent = parent


class OS:
    def __init__(self, image, name, developer, release_date, version,
                 os_kernel, os_family, supported_cpu_instruction_sets,
                 predecessor, brands, models, codename=None,
                 successor=None):
        self.image = image
        self.name = name
        self.developer = developer
        self.release_date = release_date
        self.version = version
        self.os_kernel = os_kernel
        self.os_family = os_family
        self.supported_cpu_instruction_sets = supported_cpu_instruction_sets
        self.predecessor = predecessor
        self.brands = brands
        self.models = models
        self.codename = codename
        self.successor = successor


class Carrier:
    def __init__(self, image, name, short_name, cellular_networks,
                 covered_countries, brands, models):
        self.image = image
        self.name = name
        self.short_name = short_name
        self.cellular_networks = cellular_networks
        self.covered_countries = covered_countries
        self.brands = brands
        self.models = models
