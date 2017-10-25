from sqlalchemy import create_engine
import __config__ as conf
from sqlalchemy.orm import sessionmaker

import tables
import models

class Database:
    def __init__(self):
        self.engine = create_engine(conf.db_source, echo=True)
        self.Session = sessionmaker(bind=engine)

    def get_model_all(self):
        pass

    def get_brand_all(self):
        pass

    def get_os_all(self):
        pass

    def get_carrier_all(self):
        carriers = []
        with self.Session() as session:
            for carrier in session.query(tables.Carrier).order_by(tables.Carrier.id).all():

                c_brands = session.query(tables.CarrierBrand).filter_by(carrier_id=carrier.id) \
                                .join(tables.Brand).all()
                c_models = session.query(tables.CarrierModel).filter_by(carrier_id=carrier.id) \
                                .join(tables.Model).all()

                brand_names = [brand.name for brand in c_brands]
                model_names = [model.name for model in c_models]

                new_carrier = models.Carrier(carrier.image, carrier.name,
                                             carrier.short_name, carrier.cellular_networks,
                                             carrier.covered_countries,
                                             brand_names, model_names)

                carriers += new_carrier

        return carriers
