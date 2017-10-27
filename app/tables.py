from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

carrier_brand_table = Table('carrier_brand', Base.metadata,
    Column('carrier_id', Integer, ForeignKey('carrier.id')),
    Column('brand_id', Integer, ForeignKey('brand.id'))
)

carrier_model_table = Table('carrier_model', Base.metadata,
    Column('carrier_id', Integer, ForeignKey('carrier.id')),
    Column('model_id', Integer, ForeignKey('model.id'))
)

class Model(Base):
    __tablename__ = 'model'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    brand_id = Column(Integer, ForeignKey('brand.id'))
    os_id = Column(Integer, ForeignKey('os.id'))
    model = Column(String)
    release_date = Column(String)
    hardware_designer = Column(String)
    manufacturers = Column(String)
    codename = Column(String)
    market_countries = Column(String)
    market_regions = Column(String)
    physical_attributes = Column(String)
    hardware = Column(String)
    display = Column(String)
    cameras = Column(String)
    image = Column(String)

    brand = relationship('Brand', back_populates='models')
    os = relationship('OS', back_populates='models')

    carriers = relationship(
        "Carrier",
        secondary=carrier_model_table,
        back_populates="models")

    def __repr__(self):
        return "<Model(name='%s', brand_id='%d', model='%s', " \
               "release_date='%s', hardware_designer='%s', manufacturers='%s', " \
               "codename='%s', market_countries='%s', " \
               "physical_attributes='%s', os='%s', hardware='%s', " \
               "display='%s', cameras='%s', image='%s')>" % \
               (self.name, self.brand_id, self.model, self.release_date,
                self.hardware_designer, self.manufacturers, self.codename,
                self.market_countries, self.physical_attributes,
                self.os, self.hardware, self.display, self.cameras,
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
    founders = Column(String)
    parent = Column(String)
    image = Column(String)
    models = relationship('Model', back_populates='brand')

    carriers = relationship(
        "Carrier",
        secondary=carrier_brand_table,
        back_populates="brands")

    def __repr__(self):
        return "<Brand(name='%s', type_m='%s', industries='%s', " \
               "found_date='%s', location='%s', area_served='%s', " \
               "models='%s', founders='%s', parent='%s', image='%s')>" % \
               (self.name, self.type_m, self.industries,
                self.found_date, self.location, self.area_served,
                self.models, self.founders, self.parent, self.image)


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
    codename = Column(String)
    successor = Column(String)
    image = Column(String)
    models = relationship('Model', back_populates='os')

    def __repr__(self):
        return "<OS(name='%s', developer='%s', release_date='%s', version='%s', " \
               "os_kernel='%s', os_family='%s', supported_cpu_instruction_sets='%s', " \
               "predecessor='%s', codename='%s', successor='%s', image='%s')>" % \
               (self.name, self.developer, self.release_date, self.version,
                self.os_kernel, self.os_family,
                self.supported_cpu_instruction_sets, self.predecessor,
                self.codename, self.successor, self.image)

class Carrier(Base):
    __tablename__ = 'carrier'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    short_name = Column(String)
    cellular_networks = Column(String)
    covered_countries = Column(String)
    image = Column(String)

    brands = relationship(
        "Brand",
        secondary=carrier_brand_table,
        back_populates="carriers")
    models = relationship(
        "Model",
        secondary=carrier_model_table,
        back_populates="carriers")


    def __repr__(self):
        return "<Carrier(name='%s', short_name='%s', cellular_networks='%s', " \
               "covered_networks='%s', brands='%s', models='%s', image='%s')>" % \
               (self.name, self.short_name, self.cellular_networks,
                self.covered_countries, self.brands, self.models, self.image)
