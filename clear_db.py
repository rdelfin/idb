from sqlalchemy import create_engine
from app import __config__ as config
from sqlalchemy.orm import sessionmaker

import os

from app import tables

if os.path.exists(config.db_file):
    os.remove(config.db_file)

engine = create_engine(config.db_source, echo=False)
Session = sessionmaker(bind=engine)

tables.Base.metadata.create_all(engine)