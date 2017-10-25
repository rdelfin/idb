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
        pass
