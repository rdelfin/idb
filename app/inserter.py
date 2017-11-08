import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import json

from app import tables

from app import __config__ as conf

def insert_all(*, models, brands, oss, carriers):
    engine = create_engine(conf.db_source, echo=False)
    Session = sessionmaker(bind=engine)
    session = Session()

    insert_os(oss, session)
    session.commit()
    insert_brands(brands, session)
    session.commit()
    insert_carriers(carriers, session)
    session.commit()
    insert_models(models, session)
    session.commit()
    insert_carrier_brand(carriers, session)
    session.commit()
    insert_carrier_model(carriers, session)
    session.commit()

    session.commit()

def insert_os(oss, session):
    os_table = [ tables.OS(name=os.name, developer=os.developer,
                           release_date=os.release_date, version=os.version,
                           os_kernel=os.os_kernel, os_family=os.os_family,
                           supported_cpu_instruction_sets=json.dumps(os.supported_cpu_instruction_sets),
                           predecessor=os.predecessor, codename=os.codename,
                           successor=os.successor, image=os.image) for os in oss ]
    session.add_all(os_table)

def insert_brands(brands, session):
    brand_table = [ tables.Brand(name=brand.name, type_m=brand.type_m,
                                 industries=json.dumps(brand.industries),
                                 found_date=brand.found_date,
                                 location=brand.location,
                                 area_served=brand.area_served,
                                 founders=json.dumps(brand.founders),
                                 parent=brand.parent, image=brand.image)
                                 for brand in brands]

    session.add_all(brand_table)

def insert_carriers(carriers, session):
    carrier_table = [ tables.Carrier(name=carrier.name,
                                     short_name=carrier.short_name,
                                     cellular_networks=json.dumps(carrier.cellular_networks),
                                     covered_countries=json.dumps(carrier.covered_countries),
                                     image=carrier.image) for carrier in carriers ]

    session.add_all(carrier_table)

def insert_models(models, session):
    model_table = []

    for model in models:
        print('Filter: {}'.format(model.software.os))
        print('All OS: {}'.format(session.query(tables.OS).all()))

        os = session.query(tables.OS).filter_by(name=model.software.os).first()
        brand = session.query(tables.Brand).filter_by(name=model.brand).one()

        cpu = tables.Cpu(model=model.hardware.cpu.model,
                         additional_info=model.hardware.cpu.additional_info,
                         clock_speed=model.hardware.cpu.clock_speed)
        gpu = tables.Gpu(model=model.hardware.gpu.model,
                         clock_speed=model.hardware.gpu.clock_speed)
        ram = tables.Ram(type_m=model.hardware.ram.type_m,
                         capacity=model.hardware.ram.capacity)
        nv_memory = tables.NonvolatileMemory(type_m=model.hardware.nonvolatile_memory.type_m,
                                             capacity=model.hardware.nonvolatile_memory.capacity)
        hardware = tables.Hardware(cpu=cpu, gpu=gpu, ram=ram, nonvolatile_memory=nv_memory)

        physical_attributes = tables.PhysicalAttribute(width=model.physical_attributes.width,
                                                       height=model.physical_attributes.height,
                                                       depth=model.physical_attributes.depth,
                                                       dimensions=model.physical_attributes.dimensions,
                                                       mass=model.physical_attributes.mass)

        display = tables.Display(resolution=model.display.resolution,
                                 diagonal=model.display.resolution,
                                 width=model.display.resolution,
                                 height=model.display.resolution,
                                 bezel_width=model.display.resolution,
                                 area_utilization=model.display.resolution,
                                 pixel_density=model.display.resolution,
                                 type_m=model.display.resolution,
                                 color_depth=model.display.resolution,
                                 screen=model.display.resolution)

        cameras = []
        for camera in model.cameras:
            camcorder = tables.Camcorder(resolution=camera.camcorder.resolution, \
                                         formats=camera.camcorder.formats)       \
                                         if camera.camcorder is not None else None
            cameras += [tables.Camera(placement=camera.placement,
                                      module=camera.module,
                                      sensor=camera.sensor,
                                      sensor_format=camera.sensor_format,
                                      resolution=camera.resolution,
                                      num_pixels=camera.num_pixels,
                                      aperture=camera.aperture,
                                      optical_zoom=camera.optical_zoom,
                                      digital_zoom=camera.digital_zoom,
                                      focus=camera.focus,
                                      flash=camera.flash,
                                      camcorder=camcorder)]


        new_model = tables.Model(name=model.name, model=model.model,
                                 release_date=model.release_date,
                                 hardware_designer=model.hardware_designer,
                                 manufacturers=json.dumps(model.manufacturers),
                                 codename=model.codename,
                                 market_countries=json.dumps(model.market_countries),
                                 market_regions=json.dumps(model.market_regions),
                                 physical_attributes=physical_attributes,
                                 hardware=hardware,
                                 display=display,
                                 cameras=cameras,
                                 image=model.image)

        new_model.os = os
        new_model.brand = brand
        model_table += [new_model]

    session.add_all(model_table)

def insert_carrier_brand(carriers, session):
    for carrier in carriers:
        orm_carrier = session.query(tables.Carrier).filter_by(name=carrier.name).one()
        for brand in carrier.brands:
            orm_brand = session.query(tables.Brand).filter_by(name=brand.name).one()
            orm_carrier.brands += orm_brand


def insert_carrier_model(carriers, session):
    for carrier in carriers:
        orm_carrier = session.query(tables.Carrier).filter_by(name=carrier.name).one()
        for model in carrier.models:
            orm_model = session.query(tables.Model).filter_by(name=model.name).one()
            orm_carrier.models += orm_model
