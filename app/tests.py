# This is where we will test our APIs through unit tests
from unittest import main, TestCase

from db_interface import Database

import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from tables import *


class DbInterfaceTests (TestCase):
    def test_1(self):
        engine = create_engine('sqlite:///:memory:', echo=True)
        Session = sessionmaker(bind=engine)
        session = Session()

        Base.metadata.create_all(engine)

        lgv10 = Model(name="LG v10")
        lgv10.brand = Brand(name="LG", location="Seoul, South Korea")
        lgv10.os = OS(name="Android", developer="Google")
        lgv10.carriers = [Carrier(name="Verison")]

        session.add(lgv10)
        session.commit()

        db = Database(engine)

        self.assertEqual(len(db.get_carrier_all()) == 1)
        self.assertEqual(len(db.get_os_all()) == 1)
        self.assertEqual(len(db.get_brand_all()) == 1)
        self.assertEqual(len(db.get_model_all()) == 1)

        self.assertEqual(db.get_carrier_all()[0].name == "Verison")
        self.assertEqual(db.get_os_all()[0].name == "Android")
        self.assertEqual(db.get_brand_all()[0].name == "LG")
        self.assertEqual(db.get_model_all()[0].name == "LG v10")


if __name__ == "__main__" : # pragma: no cover
    main()
