from sqlalchemy import create_engine
import __config__ as conf
from sqlalchemy.orm import sessionmaker

import json

import tables
import models


class Database:
    def __init__(self, engine=create_engine(conf.db_source, echo=True)):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    def get_model_all(self):
        model_list = []
        session = self.Session()
        for model in session.query(tables.Model).order_by(tables.Model.id).all():
            model_brand = session.query(tables.Brand.name).filter_by(id=model.brand_id).all()
            model_carriers = session.query(tables.CarrierModel).filter_by(model_id=model.id)
            model_os = session.query(tables.OS).filter_by(id=model.os_id).all()

            brand_name = next(iter(model_brand)).name
            os = next(iter(model_os))
            os_name = os.name
            os_platform = os.os_family
            carriers_names = [carrier.name for carrier in model_carriers]

            phys_attr_json = json.loads(model.physical_attributes)
            phys_attr = models.PhysicalAttributes(phys_attr_json['width'],
                                                  phys_attr_json['height'],
                                                  phys_attr_json['depth'],
                                                  phys_attr_json['dimensions'],
                                                  phys_attr_json['mass'])

            hardware_json = json.loads(model.hardware)

            hardware_json['ram']['type_m'] = hardware_json['ram']['type']
            hardware_json['ram'].pop('type')
            hardware_json['nonvolatile_memory']['type_m'] = hardware_json['nonvolatile_memory']['type']
            hardware_json['nonvolatile_memory'].pop('type')
            hardware = models.Hardware(models.Cpu(**hardware_json['cpu']),
                                       models.Gpu(**hardware_json['gpu']),
                                       models.Ram(**hardware_json['ram']),
                                       models.NonvolatileMemory(**hardware_json['nonvolatile_memory']))

            software = models.Software(os_name, os_platform, None)

            display_json = json.loads(model.display)
            display_json['type_m'] = display_json['type']
            display_json.pop('type')
            display = models.Display(**display_json)

            cameras_json = json.loads(model.cameras)
            cameras = []
            for camera in cameras_json:
                camera['camcorder'] = models.Camcorder(**camera['camcorder'])
                cameras += models.Camera(**camera)

            new_model = models.Model(
                model.image, model.name, brand_name, model.model, model.release_date,
                model.hardware_designer, model.manufacturers, model.codename,
                model.market_countries, model.market_regions, carriers_names,
                phys_attr, hardware, software,
                display, cameras
            )

            session.commit()
        return model_list

    def get_brand_all(self):
        brands = []
        session = self.Session()
        for brand in session.query(tables.Brand).order_by(tables.Brand.id).all():
            brand_models = session.query(tables.Model).filter_by(brand_id=brand.id).all()
            brand_os = session.query(tables.Model).filter_by(brand_id=brand.id).join(tables.OS).distinct(tables.OS.id).all()
            brand_carriers = session.query(tables.CarrierBrand).filter_by(brand_id=brand.id).join(tables.Carrier).all()

            model_names = json.dumps([model.name for model in brand_models])
            os_names = json.dumps([os.name for os in brand_os])
            carrier_names = json.dumps([carrier.name for carrier in brand_carriers])

            brands += models.Brand(brand.image, brand.name, brand.type_m,
                                   brand.industries, brand.found_date,
                                   brand.location, brand.area_served,
                                   model_names, carrier_names, os_names,
                                   brand.founders, brand.parent)
        session.commit()
        return brands

    def get_os_all(self):
        os_list = []
        session = self.Session()
        for os in session.query(tables.OS).order_by(tables.OS.id).all():
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
        session.commit()
        return os_list


    def get_carrier_all(self):
        carriers = []
        session = self.Session()
        for carrier in session.query(tables.Carrier).order_by(tables.Carrier.id).all():

            c_brands = session.query(tables.CarrierBrand).filter_by(carrier_id=carrier.id) \
                            .join(tables.Brand).all()
            c_models = session.query(tables.CarrierModel).filter_by(carrier_id=carrier.id) \
                            .join(tables.Model).all()

            brand_names = json.dumps([brand.name for brand in c_brands])
            model_names = json.dumps([model.name for model in c_models])

            new_carrier = models.Carrier(carrier.image, carrier.name,
                                         carrier.short_name, carrier.cellular_networks,
                                         carrier.covered_countries,
                                         brand_names, model_names)

            carriers += new_carrier
        session.commit()
        return carriers
