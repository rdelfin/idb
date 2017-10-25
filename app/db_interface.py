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
        os_list = []
        with self.Session() as session:
            for os in session.query(tables.OS).order_by(tables.OS.id):
                os_models_dep = session.query(tables.Model).join(tables.OS) \
                                .filter_by(os_id=os.id).all()
                os_models = session.query(tables.Model.name.label('model_name')).join(tables.OS) \
                                .join(tables.Brand.name.label('brand_name')).filter_by(os_id=os.id).all()

                models_names_brands = [(model.model_name, model.brand_name) for model in os_models]

                models_names = [m[0] for m in models_names_brands]
                brands_names = [m[1] for m in models_names_brands]

                new_os = models.OS(os.image, os.name, os.developer, os.release_date,
                                   os.version, os.os_kernel, os.os_family,
                                   os.supported_cpu_instruction_sets, os.predecessor,
                                   brands_names, models_names, os.codename, os.successor)

                os_list += new_os

        return os_list


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
