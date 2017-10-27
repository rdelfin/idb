# This is where all of our model classes are defined


class PhysicalAttributes:
    def __init__(self, width, height, depth, dimensions, mass):
        self.width = width
        self.height = height
        self.depth = depth
        self.dimensions = dimensions
        self.mass = mass

    def serialize(self):
        return {
            'width': self.width,
            'height': self.height,
            'depth': self.depth,
            'dimensions': self.dimensions,
            'mass': self.mass
        }


class Hardware:
    def __init__(self, cpu, gpu, ram, nonvolatile_memory):
        self.cpu = cpu
        self.gpu = gpu
        self.ram = ram
        self.nonvolatile_memory = nonvolatile_memory

    def serialize(self):
        return {
            'cpu': self.cpu.serialize(),
            'gpu': self.gpu.serialize(),
            'ram': self.ram.serialize(),
            'nonvolatile_memory': self.nonvolatile_memory.serialize()
        }


class Cpu:
    def __init__(self, model, additional_info, clock_speed):
        self.model = model
        self.additional_info = additional_info
        self.clock_speed = clock_speed

    def serialize(self):
        return {
            'model': self.model,
            'additional_info': self.additional_info,
            'clock_speed': self.clock_speed
        }


class Gpu:
    def __init__(self, model, clock_speed):
        self.model = model
        self.clock_speed = clock_speed

    def serialize(self):
        return {
            'model': self.model,
            'clock_speed': self.clock_speed
        }


class Ram:
    def __init__(self, type_m, capacity):
        self.type_m = type_m
        self.capacity = capacity

    def serialize(self):
        return {
            'type': self.type_m,
            'capacity': self.capacity
        }


class NonvolatileMemory:
    def __init__(self, type_m, capacity):
        self.type_m = type_m
        self.capacity = capacity

    def serialize(self):
        return {
            'type': self.type_m,
            'capacity': self.capacity
        }


class Display:
    def __init__(self, resolution, diagonal, width, height, bezel_width,
                 area_utilization, pixel_density, type_m, color_depth, screen):
        self.resolution = resolution
        self.diagonal = diagonal
        self.width = width
        self.height = height
        self.bezel_width = bezel_width
        self.area_utilization = area_utilization
        self.pixel_density = pixel_density
        self.type_m = type_m
        self.color_depth = color_depth
        self.screen = screen

    def serialize(self):
        return {
           'resolution': self.resolution,
           'diagonal': self.diagonal,
           'width': self.width,
           'height': self.height,
           'bezel_width': self.bezel_width,
           'area_utilization': self.area_utilization,
           'pixel_density': self.pixel_density,
           'type': self.type_m,
           'color_depth': self.color_depth,
           'screen': self.screen
        }


class Camera:
    def __init__(self, placement, module, sensor, sensor_format, resolution,
                 num_pixels, aperture, optical_zoom, digital_zoom, focus,
                 camcorder, flash):
        self.placement = placement
        self.module = module
        self.sensor = sensor
        self.sensor_format = sensor_format
        self.resolution = resolution
        self.num_pixels = num_pixels
        self.aperture = aperture
        self.optical_zoom = optical_zoom
        self.digital_zoom = digital_zoom
        self.focus = focus
        self.camcorder = camcorder.serialize()
        self.flash = flash

    def serialize(self):
        return {
            'placement': self.placement,
            'module': self.module,
            'sensor': self.sensor,
            'sensor_format': self.sensor_format,
            'resolution': self.resolution,
            'num_pixels': self.num_pixels,
            'aperture': self.aperture,
            'optical_zoom': self.optical_zoom,
            'digital_zoom': self.digital_zoom,
            'focus': self.focus,
            'camcorder': None if self.camcorder is None else self.camcorder.serialize(),
            'flash': self.flash
        }


class Camcorder:
    def __init__(self, resolution, formats):
        self.resolution = resolution
        self.formats = formats

    def serialize(self):
        return {
            'resolution': self.resolution,
            'formats': self.formats
        }


class Software:
    def __init__(self, platform, os, software_extras):
        self.platform = platform
        self.os = os
        self.software_extras = software_extras

class Model:
    def __init__(self, image, name, brand, model, release_date,
                 hardware_designer, manufacturers, codename, market_countries,
                 market_regions, carriers, physical_attributes,
                 hardware, software, display, cameras):
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
        self.hardware = hardware
        self.software = software
        self.display = display
        self.cameras = cameras

    def serialize(self):
        return {
            'image': self.image,
            'name': self.name,
            'brand': self.brand,
            'model': self.model,
            'release_date': self.release_date,
            'hardware_designer': self.hardware_designer,
            'manufacturers': self.manufacturers,
            'codename': self.codename,
            'market_countries': self.market_countries,
            'market_regions': self.market_regions,
            'carriers': self.carriers,
            'physical_attributes': self.physical_attributes.serialize(),
            'software': self.software.serialize(),
            'hardware': self.hardware.serialize(),
            'display': self.display.serialize(),
            'cameras': self.cameras.serialize()
        }


class Brand:
    def __init__(self, image, name, type_m, industries, found_date, location,
                 area_served, phone_models, carriers, os, founders,
                 parent):
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

    def serialize(self):
        return {
            'image': self.image,
            'name': self.name,
            'type': self.type_m,
            'industries': self.industries,
            'found_date': self.found_date,
            'location': self.location,
            'area_served': self.area_served,
            'phone_models': self.phone_models,
            'carriers': self.carriers,
            'os': self.os,
            'founders': self.founders,
            'parent': self.parent
        }


class OS:
    def __init__(self, image, name, developer, release_date, version,
                 os_kernel, os_family, supported_cpu_instruction_sets,
                 predecessor, brands, models, codename,
                 successor):
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

    def serialize(self):
        return {
            'image': self.image,
            'name': self.name,
            'developer': self.developer,
            'release_date': self.release_date,
            'version': self.version,
            'os_kernel': self.os_kernel,
            'os_family': self.os_family,
            'supported_cpu_instruction_sets': self.supported_cpu_instruction_sets,
            'predecessor': self.predecessor,
            'brands': self.brands,
            'models': self.models,
            'codename': self.codename,
            'successor': self.successor
        }


class Carrier:
    def __init__(self, image, name, short_name=None, cellular_networks=None,
                 covered_countries=None, brands=None, models=None):
        self.image = image
        self.name = name
        self.short_name = short_name
        self.cellular_networks = cellular_networks
        self.covered_countries = covered_countries
        self.brands = brands
        self.models = models

    def serialize(self):
        return {
            'image': self.image,
            'name': self.name,
            'short_name': self.short_name,
            'cellular_networks': self.cellular_networks,
            'covered_countries': self.covered_countries,
            'brands': self.brands,
            'models': self.models
        }
