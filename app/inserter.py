import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import tables
from app import models

from app import __config__ as conf

def insert_all(*, models, brands, oss, carriers):
    engine = create_engine(conf.db_source, echo=False)
    Session = sessionmaker(bind=engine)
    session = Session()

    insert_os(oss, session)
    insert_brands(brands, session)
    insert_carriers(carriers, session)
    insert_models(modes, oss, brands, session)
    insert_carrier_brand(carriers, brands, session)
    insert_carrier_model(carriers, models, session)

    session.commit()

def insert_os(oss, session):
    raise NotImplementedError

def insert_brands(brands, session):
    raise NotImplementedError

def insert_carriers(carriers, session):
    raise NotImplementedError

def insert_models(models, oss, brands, session):
    raise NotImplementedError

def insert_carrier_brand(carriers, brands, session):
    raise NotImplementedError

def insert_carrier_model(carriers, models, session):
    raise NotImplementedErrorin
