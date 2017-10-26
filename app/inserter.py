from app import tables
from app import models

from app import __config__ as conf

def insert_all(*, models, brands, oss, carriers):
    self.engine = create_engine(conf.db_source, echo=False)
    Session = sessionmaker(bind=self.engine)
    session = Session()

    insert_os(oss, session)
    insert_brands(brands, session)
    insert_carriers(carriers, session)
    insert_models(modes, oss, brands, session)
    insert_carrier_brand(carriers, brands, session)
    insert_carrier_model(carriers, models, session)

    session.commit()

def insert_os(oss, session):
    pass

def insert_brands(brands, session):
    pass

def insert_carriers(carriers, session):
    pass

def insert_models(models, oss, brands, session):
    pass

def insert_carrier_brand(carriers, brands, session):
    pass

def insert_carrier_model(carriers, models, session):
    pass
