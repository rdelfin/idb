from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Model(Base):
    __tablename__ = 'model'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    brand_id = Column(Integer, ForeignKey('brand.id'))
    model = Column(String)
    release_date = Column(String)
    hardware_designer = Column(String)
    manufacturers = Column(String)
    codename = Column(String)
    market_countries = Column(String)
    market_regions = Column(String)
    carriers = Column(String)
    physical_attributes = Column(String)
    software = Column(String)
    hardware = Column(String)
    display = Column(String)
    cameras = Column(String)
    image = Column(String)

    def __repr__(self):
        return "<Model(name='%s', brand_id='%d', model='%s', " \
               "release_date='%s', hardware_designer='%s', manufacturers='%s', " \
               "codename='%s', market_countries='%s', carriers='%s', " \
               "physical_attributes='%s', software='%s', hardware='%s', " \
               "display='%s', cameras='%s', image='%s')>" % \
               (self.name, self.brand_id, self.model, self.release_date,
                self.hardware_designer, self.manufacturers, self.codename,
                self.market_countries, self.carriers, self.physical_attributes,
                self.software, self.hardware, self.display, self.cameras,
                self.image)


class Brand(Base):
    __tablename__ = 'brand'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    type_m = Column(String)
    industries = Column(String)
    found_date = Column(String)
    location = Column(String)
    area_served = Column(String)
    phone_models = Column(String)
    carriers = Column(String)
    os = Column(String)
    founders = Column(String)
    parent = Column(String)
    image = Column(String)

    def __repr__(self):
        return "<Brand(name='%s', type_m='%s', industries='%s', " \
               "found_date='%s', location='%s', area_served='%s', " \
               "phone_models='%s', carriers='%s', os='%s', founders='%s', " \
               "parent='%s', image='%s')>" % \
               (self.name, self.type_m, self.industries,
                self.found_date, self.location, self.area_served,
                self.phone_models, self.carriers, self.os, self.founders,
                self.parent, self.image)


class OS(Base):
    __tablename__ = 'os'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    developer = Column(String)
    release_date = Column(String)
    version = Column(String)
    os_kernel = Column(String)
    os_family = Column(String)
    supported_cpu_instruction_sets = Column(String)
    predecessor = Column(String)
    brands = Column(String)
    models = Column(String)
    codename = Column(String)
    successor = Column(String)
    image = Column(String)

    def __repr__(self):
        return "<OS(name='%s', developer='%s', release_date='%s', version='%s', " \
               "os_kernel='%s', os_family='%s', " \
               "supported_cpu_instruction_sets='%s', predecessor='%s', " \
               "brands='%s', models='%s', codename='%s', successor='%s', " \
               "image='%s')>" % \
               (self.name, self.developer, self.release_date, self.version,
                self.os_kernel, self.os_family,
                self.supported_cpu_instruction_sets, self.predecessor,
                self.brands, self.models, self.codename, self.successor,
                self.image)


class BrandOS(Base):
    __tablename__ = 'brand_os'

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey('brand.id'))
    os_id = Column(Integer, ForeignKey('os.id'))

    def __repr__(self):
        return "<BrandOS(brand_id=%d, os_id=%d)>" % (self.brand_id, self.os_id)

class Carrier(Base):
    __tablename__ = 'carrier'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    short_name = Column(String)
    cellular_networks = Column(String)
    covered_countries = Column(String)
    image = Column(String)

    def __repr__(self):
        return "<Carrier(name='%s', short_name='%s', cellular_networks='%s', " \
               "covered_networks='%s', brands='%s', models='%s', image='%s')>" % \
               (self.name, self.short_name, self.cellular_networks,
                self.covered_countries, self.brands, self.models, self.image)


class CarrierBrand(Base):
    __tablename__ = 'carrier_brand'

    id = Column(Integer, primary_key=True)
    carrier_id = Column(Integer, ForeignKey('carrier.id'))
    brand_id = Column(Integer, ForeignKey('brand.id'))

    def __repr__(self):
        return "<CarrierBrand(carrier_id=%d, brand_id=%d)>" % \
               (self.carrier_id, self.brand_id)

class CarrierModel(Base):
    __tablename__ = 'carrier_model'

    id = Column(Integer, primary_key=True)
    carrier_id = Column(Integer, ForeignKey('carrier.id'))
    model_id = Column(Integer, ForeignKey('model.id'))

    def __repr__(self):
        return "<CarrierBrand(carrier_id=%d, model_id=%d)>" % \
               (self.carrier_id, self.model_id)