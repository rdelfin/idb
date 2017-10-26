# This is where we will test our APIs through unit tests
from unittest import main, TestCase

from db_interface import Database

import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from tables import *


class DbInterfaceTests (TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)

        lgv10 = Model(name="LG v10")
        lgv10.brand = Brand(name="LG", location="Seoul, South Korea")
        lgv10.os = OS(name="Android", developer="Google")
        lgv10.carriers = [Carrier(name="Verison")]

        session.add(lgv10)
        session.commit()

        self.db = Database(self.engine)

    def test_os(self):
        self.assertEqual(len(self.db.get_os_all()), 1)
        self.assertEqual(self.db.get_os_all()[0].name, "Android")

    def test_carrier(self):
        self.assertEqual(len(self.db.get_carrier_all()), 1)
        self.assertEqual(self.db.get_carrier_all()[0].name, "Verison")

    def test_brand(self):
        self.assertEqual(len(self.db.get_brand_all()), 1)
        self.assertEqual(self.db.get_brand_all()[0].name, "LG")

    def test_model(self):
        self.assertEqual(len(self.db.get_model_all()), 1)
        self.assertEqual(self.db.get_model_all()[0].name, "LG v10")



if __name__ == "__main__" : # pragma: no cover
    main()
