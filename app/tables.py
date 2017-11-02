from sqlalchemy import Table, Column, Integer, String, Float, ForeignKey
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

class PhysicalAttribute(Base):
    __tablename__ = 'physical_attribute'

    id = Column(Integer, primary_key=True)
    width = Column(Float)
    height = Column(Float)
    depth = Column(Float)
    dimensions = Column(String)
    mass = Column(String)

    models = relationship('Model', back_populates='physical_attribute')

    def __repr__(self):
        return "<PhysicalAttributes(width='%s', height='%d', depth='%s', " \
               "dimensions='%s', mass='%s')>" % \
               (self.width, self.height, self.depth, self.dimensions,
                self.mass)

class Cpu(Base):
    __tablename__ = 'cpu'

    id = Column(Integer, primary_key=True)
    model = Column(String)
    additional_info = Column(String)
    clock_speed = Column(String)

    hardwares = relationship('Hardware', back_populates='cpu')

    def __repr__(self):
        return "<Cpu(model='%s', additional_info='%s', clock_speed='%s')>" \
                % (self.model, self.additional_info, self.clock_speed)

class Gpu(Base):
    __tablename__ = 'gpu'

    id = Column(Integer, primary_key=True)
    model = Column(String)
    clock_speed = Column(String)

    hardwares = relationship('Hardware', back_populates='gpu')

    def __repr__(self):
        return "<Gpu(model='%s', clock_speed='%s')>" \
                % (self.model, self.clock_speed)

class Ram(Base):
    __tablename__ = 'ram'

    id = Column(Integer, primary_key=True)
    type_m = Column(String)
    capacity = Column(String)

    hardwares = relationship('Hardware', back_populates='ram')

    def __repr__(self):
        return "<Ram(type_m='%s', capacity='%s')>" \
                % (self.type_m, self.capacity)

class NonvolatileMemory(Base):
    __tablename__ = 'nonvolatile_memory'

    id = Column(Integer, primary_key=True)
    type_m = Column(String)
    capacity = Column(String)

    hardwares = relationship('Hardware', back_populates='nonvolatile_memory')

    def __repr__(self):
        return "<NonvolatileMemory(type_m='%s', capacity='%s')>" \
                % (self.type_m, self.capacity)

class Hardware(Base):
    __tablename__ = 'hardware'

    id = Column(Integer, primary_key=True)
    cpu_id = Column(Integer, ForeignKey('cpu.id'))
    gpu_id = Column(Integer, ForeignKey('gpu.id'))
    ram_id = Column(Integer, ForeignKey('ram.id'))
    nonvolatile_memory_id = Column(Integer, ForeignKey('nonvolatile_memory.id'))

    cpu = relationship('Cpu', back_populates='hardwares')
    gpu = relationship('Gpu', back_populates='hardwares')
    ram = relationship('Ram', back_populates='hardwares')
    nonvolatile_memory = relationship('NonvolatileMemory', back_populates='hardwares')
    models = relationship('Model', back_populates='hardware')

    def __repr__(self):
        return "<Hardware()>"

class Display(Base):
    __tablename__ = 'display'

    id = Column(Integer, primary_key=True)
    resolution = Column(String)
    diagonal = Column(String)
    width = Column(String)
    height = Column(String)
    bezel_width = Column(String)
    area_utilization = Column(String)
    pixel_density = Column(String)
    type_m = Column(String)
    color_depth = Column(String)
    screen = Column(String)

    models = relationship('Model', back_populates='display')

    def __repr__(self):
        return "<Display(resolution='%s', diagonal='%s', width='%s', " \
               "height='%s', bezel_width='%s', area_utilization='%s', " \
               "pixel_density='%s', type_m='%s', color_depth='%s', " \
               "screen='%s')>" % (self.resolution, self.diagonal,
               self.width, self.height, self.bezel_width,
               self.area_utilization, self.pixel_density, self.type_m, 
               self.color_depth, self.screen)

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
    physical_attribute_id = Column(Integer, ForeignKey('physical_attribute'))
    hardware_id = Column(Integer, ForeignKey('hardware'))
    display_id = Column(Integer, ForeignKey('display'))
    cameras = Column(String)
    image = Column(String)

    brand = relationship('Brand', back_populates='models')
    os = relationship('OS', back_populates='models')
    physical_attribute = relationship('PhysicalAttribute', back_populates='models')
    hardware = relationship('Hardware', back_populates='models')
    display = relationship('Display', back_populates='models')

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
