# This is where all of our model classes are defined


class PhysicalAttributes:
    def __init__(self, width=None, height=None, depth=None, dimensions=None, mass=None):
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

    def __repr__(self):
        return repr(self.serialize())


class Hardware:
    def __init__(self, cpu=None, gpu=None, ram=None, nonvolatile_memory=None):
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

    def __repr__(self):
        return repr(self.serialize())


class Cpu:
    def __init__(self, model=None, additional_info=None, clock_speed=None):
        self.model = model
        self.clock_speed = clock_speed

        self.additional_info = additional_info \
            if not additional_info or not isinstance(additional_info, str) \
            else [additional_info]

    def serialize(self):
        return {
            'model': self.model,
            'additional_info': self.additional_info,
            'clock_speed': self.clock_speed
        }

    def __repr__(self):
        return repr(self.serialize())


class Gpu:
    def __init__(self, model=None, clock_speed=None):
        self.model = model
        self.clock_speed = clock_speed

    def serialize(self):
        return {
            'model': self.model,
            'clock_speed': self.clock_speed
        }

    def __repr__(self):
        return repr(self.serialize())


class Ram:
    def __init__(self, type_m=None, capacity=None):
        self.type_m = type_m
        self.capacity = capacity

    def serialize(self):
        return {
            'type': self.type_m,
            'capacity': self.capacity
        }

    def __repr__(self):
        return repr(self.serialize())


class NonvolatileMemory:
    def __init__(self, type_m=None, capacity=None):
        self.type_m = type_m
        self.capacity = capacity

    def serialize(self):
        return {
            'type': self.type_m,
            'capacity': self.capacity
        }

    def __repr__(self):
        return repr(self.serialize())


class Display:
    def __init__(self, resolution=None, diagonal=None, width=None, height=None, bezel_width=None,
                 area_utilization=None, pixel_density=None, type_m=None, color_depth=None, screen=None):
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

    def __repr__(self):
        return repr(self.serialize())


class Camera:
    def __init__(self, placement=None, module=None, sensor=None, sensor_format=None, resolution=None,
                 num_pixels=None, aperture=None, optical_zoom=None, digital_zoom=None, focus=None,
                 camcorder=None, flash=None):
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
        self.camcorder = camcorder
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
            'camcorder': self.camcorder.serialize(),
            'flash': self.flash
        }

    def __repr__(self):
        return repr(self.serialize())


class Camcorder:
    def __init__(self, resolution=None, formats=None):
        self.resolution = resolution
        self.formats = formats

    def serialize(self):
        return {
            'resolution': self.resolution,
            'formats': self.formats
        }

    def __repr__(self):
        return repr(self.serialize())


class Software:
    def __init__(self, platform=None, os=None, software_extras=None):
        self.platform = platform
        self.os = os
        self.software_extras = software_extras \
            if not software_extras or not isinstance(software_extras, str) \
            else [software_extras]

    def serialize(self):
        return {
            'platform': self.platform,
            'os': self.os,
            'software_extras': self.software_extras
        }

    def __repr__(self):
        return repr(self.serialize())


class Model:
    def __init__(self, image=None, name=None, brand=None, model=None, release_date=None,
                 hardware_designer=None, manufacturers=None, codename=None, market_countries=None,
                 market_regions=None, carriers=None, physical_attributes=None,
                 hardware=None, software=None, display=None, cameras=None):

        # singular attributes
        self.image = image
        self.name = name
        self.brand = brand
        self.model = model
        self.release_date = release_date
        self.hardware_designer = hardware_designer
        self.codename = codename

        # list attributes (convert to list if it's neither str nor None)
        self.manufacturers = manufacturers \
            if not manufacturers or not isinstance(manufacturers, str) else [manufacturers]
        self.market_countries = market_countries \
            if not market_countries or not isinstance(market_countries, str) else [market_countries]
        self.market_regions = market_regions \
            if not market_regions or not isinstance(market_regions, str) else [market_regions]
        self.carriers = carriers \
            if not carriers or not isinstance(carriers, str) else [carriers]

        # classed attributes
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
            'cameras': [camera.serialize() for camera in self.cameras]
        }

    def __repr__(self):
        return repr(self.serialize())


class Brand:
    def __init__(self, image, name, type_m, industries, found_date, location,
                 area_served, phone_models, carriers, os, founders,
                 parent):
        self.image = image
        self.name = name
        self.type_m = type_m
        self.found_date = found_date
        self.location = location
        self.area_served = area_served
        self.parent = parent

        self.industries = industries \
            if not industries or not isinstance(industries, str) else [industries]
        self.phone_models = phone_models \
            if not phone_models or not isinstance(phone_models, str) else [phone_models]
        self.carriers = carriers \
            if not carriers or not isinstance(carriers, str) else [carriers]
        self.os = os \
            if not os or not isinstance(os, str) else [os]
        self.founders = founders \
            if not founders or not isinstance(founders, str) else [founders]

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

    def __repr__(self):
        return repr(self.serialize())


class OS:
    def __init__(self, image=None, name=None, developer=None, release_date=None, version=None,
                 os_kernel=None, os_family=None, supported_cpu_instruction_sets=None,
                 predecessor=None, brands=None, models=None, codename=None,
                 successor=None):
        self.image = image
        self.name = name
        self.developer = developer
        self.release_date = release_date
        self.version = version
        self.os_kernel = os_kernel
        self.os_family = os_family
        self.supported_cpu_instruction_sets = supported_cpu_instruction_sets \
            if not supported_cpu_instruction_sets or not isinstance(supported_cpu_instruction_sets, str) \
            else [supported_cpu_instruction_sets]

        self.predecessor = predecessor
        self.brands = brands \
            if not brands or not isinstance(brands, str) else [brands]
        self.models = models \
            if not models or not isinstance(models, str) else [models]
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

    def __repr__(self):
        return repr(self.serialize())


class Carrier:
    def __init__(self, image, name, short_name=None, cellular_networks=None,
                 covered_countries=None, brands=None, models=None):
        self.image = image
        self.name = name
        self.short_name = short_name

        self.cellular_networks = cellular_networks \
            if not cellular_networks or not isinstance(cellular_networks, str) else [cellular_networks]
        self.covered_countries = covered_countries \
            if not covered_countries or not isinstance(covered_countries, str) else [covered_countries]
        self.brands = brands \
            if not brands or not isinstance(brands, str) else [brands]
        self.models = models \
            if not models or not isinstance(models, str) else [models]

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

    def __repr__(self):
        return repr(self.serialize())
