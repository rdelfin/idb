from sqlalchemy import create_engine
from app import __config__ as conf
from sqlalchemy.orm import sessionmaker

import json

from app import tables
from app import models

def table_model_to_model(model):
    brand_name = model.brand.name
    os = model.os
    os_name = os.name if os is not None else None
    os_platform = os.os_family if os is not None else None
    carriers_names = [carrier.name for carrier in model.carriers]

    hardware = None

    if model.hardware is not None:
        cpu = models.Cpu(model.hardware.cpu.model,
                        model.hardware.cpu.additional_info,
                        model.hardware.cpu.clock_speed) \
                        if model.hardware.cpu is not None else None

        gpu = models.Gpu(model.hardware.gpu.model,
                            model.hardware.gpu.clock_speed) \
                            if model.hardware.gpu is not None else None

        ram = models.Ram(model.hardware.ram.type_m,
                            model.hardware.ram.capacity) \
                            if model.hardware.ram is not None else None
        nv_memory = models.NonvolatileMemory(model.hardware.nonvolatile_memory.type_m,
                                                model.hardware.nonvolatile_memory.capacity) \
                                                if model.hardware.nonvolatile_memory is not None else None

        hardware = models.Hardware(cpu, gpu, ram, nv_memory)

    phys_attr = models.PhysicalAttributes(model.physical_attribute.width,
                                            model.physical_attribute.height,
                                            model.physical_attribute.depth,
                                            model.physical_attribute.dimensions,
                                            model.physical_attribute.mass) \
                                            if model.physical_attribute is not None else None

    software = models.Software(os_name, os_platform, None) \
                                if os is not None else None

    display = models.Display(model.display.resolution,
                                model.display.diagonal,
                                model.display.width,
                                model.display.height,
                                model.display.bezel_width,
                                model.display.area_utilization,
                                model.display.pixel_density,
                                model.display.type_m,
                                model.display.color_depth,
                                model.display.screen) \
                                if model.display is not None else None

    cameras = []

    for camera in model.cameras:
        camcorder = models.Camcorder(camera.camcorder.resolution, \
                                        camera.camcorder.formats) \
                                        if camera.camcorder is not None else None
        cameras += [models.Camera(camera.placement,
                                    camera.module,
                                    camera.sensor,
                                    camera.sensor_format,
                                    camera.resolution,
                                    camera.num_pixels,
                                    camera.aperture,
                                    camera.optical_zoom,
                                    camera.digital_zoom,
                                    camera.focus,
                                    camcorder,
                                    camera.flash)]
    return models.Model(
                model.image, model.name, brand_name, model.model, model.release_date,
                model.hardware_designer, model.manufacturers, model.codename,
                model.market_countries, model.market_regions, carriers_names,
                phys_attr, hardware, software,
                display, cameras)

def table_brand_to_model(self, brand):
    model_names = [model.name for model in brand.models]
    carrier_names = [carrier.name for carrier in brand.carriers]
    os_names = list({model.os.name for model in brand.models})

    return models.Brand(brand.image, brand.name, brand.type_m,
                        json.loads(brand.industries) if brand.industries is not None else [],
                        brand.found_date, brand.location,
                        brand.area_served, model_names,
                        carrier_names, os_names,
                        json.loads(brand.founders) if brand.founders is not None else [],
                        brand.parent)

def table_os_to_model(self, os):
    os_models = list({model.name for model in os.models})
    brand_names = list({mod.brand.name for mod in os.models})

    return models.OS(os.image, os.name, os.developer, os.release_date,
                     os.version, os.os_kernel, os.os_family,
                     json.loads(os.supported_cpu_instruction_sets) if os.supported_cpu_instruction_sets is not None else [],
                     os.predecessor, brand_names, os_models, os.codename, os.successor)

def table_carrier_to_model(self, carrier):
    brand_names = [brand.name for brand in carrier.brands]
    model_names = [model.name for model in carrier.models]

    return models.Carrier(carrier.image, carrier.name,
                          carrier.short_name,
                          json.loads(carrier.cellular_networks) if carrier.cellular_networks is not None else [],
                          carrier.covered_countries,
                          brand_names, model_names)

class Database:
    def __init__(self, engine=create_engine(conf.db_source, echo=False)):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    def get_model_all(self):
        session = self.Session()
        return [table_model_to_model(model) for model in session.query(tables.Model).order_by(tables.Model.id).all()]

    def get_brand_all(self):
        session = self.Session()
        return [table_brand_to_model(brand) for brand in session.query(tables.Brand).order_by(tables.Brand.id).all()]

    def get_os_all(self):
        session = self.Session()
        return [table_os_to_model(os) for os in session.query(tables.OS).order_by(tables.OS.id).all()]


    def get_carrier_all(self):
        session = self.Session()
        return [table_carrier_to_model(carrier) for carrier in session.query(tables.Carrier).order_by(tables.Carrier.id).all()]
