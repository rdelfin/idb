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
    insert_brands(brands, session)
    insert_carriers(carriers, session)
    insert_models(models, session)
    insert_carrier_brand(carriers, session)
    insert_carrier_model(carriers, session)

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
    brand_table = [ tables.Brand(name=brands.name, type_m=brands.type_m,
                                 industries=json.dumps(brands.industries),
                                 found_date=brands.found_date,
                                 location=brands.location,
                                 area_served=brands.area_served,
                                 founders=json.dumps(brands.founders),
                                 parent=brands.founders, image=brands.image)
                                 for brand in brands]

    session.add_all(brand_table)

def insert_carriers(carriers, session):
    carrier_table = [ tables.Carrier(name=carrier.name,
                                     short_name=carrier.short_name,
                                     cellular_networks=json.dumps(carrier.cellular_networks),
                                     covered_countries=carrier.covered_countries,
                                     image=carrier.image) for carrier in carriers ]

    session.add_all(carrier_table)

def insert_models(models, session):
    model_table = []

    for model in models:
        os = session.query(tables.OS).filter_by(name=model.software.os).one()
        brand = session.query(tables.Brand).filter_by(name=model.brand).one()

        new_model = tables.Model(name=model.name, model=model.model,
                                 release_date=model.release_date,
                                 hardware_designer=model.hardware_designer,
                                 manufacturers=json.dumps(model.manufacturers),
                                 codename=model.codename,
                                 market_countries=json.dumps(model.market_countries),
                                 market_regions=json.dumps(model.market_regions),
                                 physical_attributes=json.dumps(model.physical_attributes),
                                 hardware=json.dumps(model.hardware),
                                 display=json.dumps(model.display),
                                 cameras=json.dumps(model.cameras),
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
