# This is where we will test our APIs through unit tests
from unittest import main, TestCase
from app.db_interface import Database

import sqlalchemy
import json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask import jsonify 

from app.tables import *
import app.inserter as Inserter

class DbInterfaceTests (TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)

        lgv10 = Model(name="LG v10")
        lgv10.brand = Brand(name="LG", location="Seoul, South Korea")
        lgv10.os = OS(name="Android", developer="Google")
        lgv10.carriers = [Carrier(name="Verizon")]

        session.add(lgv10)
        session.commit()

        self.db = Database(self.engine)

    def test_os(self):
        self.assertEqual(len(self.db.get_os_all()), 1)
        self.assertEqual(self.db.get_os_all()[0].name, "Android")

    def test_carrier(self):
        self.assertEqual(len(self.db.get_carrier_all()), 1)
        self.assertEqual(self.db.get_carrier_all()[0].name, "Verizon")

    def test_brand(self):
        self.assertEqual(len(self.db.get_brand_all()), 1)
        self.assertEqual(self.db.get_brand_all()[0].name, "LG")

    def test_model(self):
        self.assertEqual(len(self.db.get_model_all()), 1)
        self.assertEqual(self.db.get_model_all()[0].name, "LG v10")

class MultiplePhonesTests(TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)

        lgv10 = Model(name="LG v10")
        lgv10.brand = Brand(name="LG", location="Seoul, South Korea")
        lgv10.os = OS(name="Android", developer="Google")
        lgv10.carriers = [Carrier(name="Verizon")]

        session.add(lgv10)
        session.commit()

        iPhoneX = Model(name="Apple iPhoneX")
        iPhoneX.brand = Brand(name="Apple", location="Cupertino, United States")
        iPhoneX.os = OS(name="iOS", developer="Apple")
        iPhoneX.carriers = [Carrier(name="AT&T")]

        session.add(iPhoneX)
        session.commit()

        self.db = Database(self.engine)

    def test_os(self):
        self.assertEqual(len(self.db.get_os_all()), 2)
        self.assertEqual(self.db.get_os_all()[0].name, "Android")
        self.assertEqual(self.db.get_os_all()[1].name, "iOS")

    def test_carrier(self):
        self.assertEqual(len(self.db.get_carrier_all()), 2)
        self.assertEqual(self.db.get_carrier_all()[0].name, "Verizon")
        self.assertEqual(self.db.get_carrier_all()[1].name, "AT&T")

    def test_brand(self):
        self.assertEqual(len(self.db.get_brand_all()), 2)
        self.assertEqual(self.db.get_brand_all()[0].name, "LG")
        self.assertEqual(self.db.get_brand_all()[1].name, "Apple")

    def test_model(self):
        self.assertEqual(len(self.db.get_model_all()), 2)
        self.assertEqual(self.db.get_model_all()[0].name, "LG v10")
        self.assertEqual(self.db.get_model_all()[1].name, "Apple iPhoneX")

class MissingCarrierTests(TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)

        iPhoneX = Model(name="Apple iPhoneX")
        iPhoneX.brand = Brand(name="Apple", location="Cupertino, United States")
        iPhoneX.os = OS(name="iOS", developer="Apple")

        session.add(iPhoneX)
        session.commit()

        self.db = Database(self.engine)

    def test_os(self):
        self.assertEqual(len(self.db.get_os_all()), 1)
        self.assertEqual(self.db.get_os_all()[0].name, "iOS")

    def test_carrier(self):
        self.assertEqual(len(self.db.get_carrier_all()), 0)

    def test_brand(self):
        self.assertEqual(len(self.db.get_brand_all()), 1)
        self.assertEqual(self.db.get_brand_all()[0].name, "Apple")

    def test_model(self):
        self.assertEqual(len(self.db.get_model_all()), 1)
        self.assertEqual(self.db.get_model_all()[0].name, "Apple iPhoneX")

class EmptyTest(TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)
        session.commit()

        self.db = Database(self.engine)

    def test_os(self):
        self.assertEqual(len(self.db.get_os_all()), 0)

    def test_carrier(self):
        self.assertEqual(len(self.db.get_carrier_all()), 0)

    def test_brand(self):
        self.assertEqual(len(self.db.get_brand_all()), 0)

    def test_model(self):
        self.assertEqual(len(self.db.get_model_all()), 0)

class FullModelTest(TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)

        lgv10 = Model(name="LG v10")
        lgv10.brand = Brand(name="LG", location="Seoul, South Korea")
        lgv10.os = OS(name="Android", developer="Google")
        lgv10.carriers = [Carrier(name="Verizon")]
        lgv10.release_date = "10/02/2015"
        lgv10.hardware_designer = "LG"
        lgv10.market_countries = "South Korea"
        lgv10.market_regions = "Asia"

        session.add(lgv10)
        session.commit()

        self.db = Database(self.engine)

    def test_model(self):
        self.assertEqual(len(self.db.get_model_all()), 1)
        self.assertEqual(self.db.get_model_all()[0].name, "LG v10")
        self.assertEqual(self.db.get_model_all()[0].brand, "LG")
        self.assertEqual(self.db.get_model_all()[0].carriers, ["Verizon"])
        self.assertEqual(self.db.get_model_all()[0].release_date, "10/02/2015")
        self.assertEqual(self.db.get_model_all()[0].market_countries, ["South Korea"])
        self.assertEqual(self.db.get_model_all()[0].market_regions, ["Asia"])

class InsertOsTest(TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=False)
        Session = sessionmaker(bind=self.engine)
        session = Session()

        Base.metadata.create_all(self.engine)
        session.commit()
        self.db = Database(self.engine)
        self.session = session

    def os_builder(self, quantity):
        oss = []
        for i in range(0, quantity):
            os = OS(image="http://placekitten.com/{0}".format(i),
                    name="iPhone {0}".format(i),
                    developer="Apple {0}".format(i),
                    release_date="01/01/1999",
                    version="0.{0}".format(i),
                    os_kernel="0.{0}".format(i),
                    os_family="0.{0}".format(i),
                    supported_cpu_instruction_sets=list(range(0, i)),
                    predecessor="iPhone {0}".format(i - 1),
                    brands=list(range(0, i)),
                    models=list(range(0, i)),
                    codename="iPhone {0}".format(i),
                    successor="iPhone {0}".format(i + 1))
            oss += [os]
        
    def insert_os_test(self):
        oss = self.os_builder(10)
        insert_os(oss, session)
        os_get = self.db.get_os_all()
        self.assertEqual(len(os_get), 10)
        i = 0
        for os in os_get:
            self.assertEqual(os.image, "http://placekitten.com/{0}".format(i))
            self.assertEqual(os.name, "iPhone {0}".format(i))
            self.assertEqual(os.developer, "Apple {0}".format(i))
            self.assertEqual(os.release_date, "01/01/1999")
            self.assertEqual(os.version, "0.{0}".format(i))
            self.assertEqual(os.os_kernel, "0.{0}".format(i))
            self.assertEqual(os.os_family, "0.{0}".format(i))
            self.assertEqual(os.supported_cpu_instruction_sets, list(range(0, i)))
            self.assertEqual(os.predecessor, "iPhone {0}".format(i - 1))
            self.assertEqual(os.brands, list(range(0, i)))
            self.assertEqual(os.models, list(range(0, i)))
            self.assertEqual(os.codename, "iPhone {0}".format(i))
            self.assertEqual(os.successor, "iPhone {0}".format(i + 1))
            i += 1

# class JsonTest(TestCase):
#     def setUp(self):
#         self.engine = create_engine('sqlite:///:memory:', echo=False)
#         Session = sessionmaker(bind=self.engine)
#         session = Session()

#         Base.metadata.create_all(self.engine)

#         iPhoneX = Model(name="Apple iPhoneX")
#         iPhoneX.os = OS(name="iOS", developer="Apple")
#         iPhoneX.brand = Brand(name="Apple", location="Cupertino, United States")
#         iPhoneX.carriers = [Carrier(name="AT&T")]

#         session.add(iPhoneX)
#         session.commit()

#         self.db = Database(self.engine)

#     def test_os(self):
#         self.assertEqual(jsonify(self.db.get_os_all()), 
#         """
#         [
#           {
#             "name": "iOS",
#             "developer": "Apple"
#           }
#         ]
#         """)

#     def test_carrier(self):
#         self.assertEqual(jsonify(self.db.get_carrier_all()), 
#         """
#         [
#           "name": "LG",
#           "location": "Yeouido-dong, Seoul, South Korea"
#         ]
#         """)

#     def test_brand(self):
#         self.assertEqual(jsonify(self.db.get_brand_all()), 
#         """
#         [
#           {
#             "name": "AT&T"
#           }
#         ]
#         """)

#     def test_model(self):
#         self.assertEqual(jsonify(self.db.get_brand_all()), 
#         """
#         [
#           {
#             "name": "Apple iPhoneX"
#           }
#         ]
#         """)




if __name__ == "__main__" : # pragma: no cover
    main()
