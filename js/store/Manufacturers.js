// @flow
import {createAsyncStore, delayedPromisify} from './util';

export type Manufacturer = {
  image: string,
  name: string,
  type: string,
  industries: Array<string>,
  found_date: string,
  founders?: Array<string>,
  location: string,
  area_served: string,
  parent?: string,
  phone_models: Array<string>,
  carriers: Array<string>,
  os: Array<string>,
};

const mockData: Array<Manufacturer> = [
  {
    "image": "/static/images/ex/lg_brand_logo.png",
    "name": "LG",
    "type": "Public",
    "industries": [
      "Consumer electronics",
      "Home appliances"
    ],
    "found_date": "October 1958",
    "founders": ["Koo In-hwoi"], 
    "location": "Yeouido-dong, Seoul, South Korea",
    "area_served": "Worldwide",
    "parent": "LG Corporation",
    "phone_models": [
      "LG LS998 V30+ TD-LTE / AS998  (LG Joan)"
    ],
    "carriers": [
      "Sprint Nextel Corporation"
    ],
    "os": [
      "Google Android 7.1.2 (Nougat)"
    ]
  },
  {
    "image": "/static/images/ex/samsung_brand_logo.jpeg",
    "name": "Samsung",
    "type": "Public",
    "industries": [
      "Consumer electronics",
      "Semiconductors", 
      "Home appliances"
    ],
    "found_date": "13 January 1969",
    "location": "Yeongtong District, Suwon, South Korea",
    "area_served": "Worldwide",
    "parent": "Samsung Group",
    "phone_models": [
      "Samsung SM-G892U Galaxy S8 Active TD-LTE"
    ],
    "carriers": [],
    "os": [
      "Google Android 7.0 (Nougat)"
    ]
  },
  {
    "image": "/static/images/ex/apple_brand_logo.png",
        "name": "Apple Inc.",
        "type": "Public",
        "industries": [
          "Computer hardware",
      "Computer software",
      "Consumer electronics",
      "Digital distribution",
      "Semiconductors",
      "Fabless silicon design",
      "Corporate venture capital"
        ],
        "found_date": "April 1, 1976",
    "founders": [
      "Steve Jobs",
      "Steve Wozniak",
      "Ronald Wayne"
    ],
        "location": "Apple Campus, 1 Infinite Loop, Cupertino, California, U.S.",
        "area_served": "Worldwide",
        "phone_models": [
      "Apple iPhone 8 Plus A1897 TD-LTE 256GB (Apple iPhone 10,5)"
        ],
        "carriers": [
      "T-Mobile USA",
      "AT&T Mobility",
      "Telus Mobility",
      "Vodafone Italia",
      "O2 Germany",
      "Vodafone United Kingdom",
      "O2 United Kingdom",
      "Hutchison Three UK",
      "EE Limited UK",
      "Turkcell",
      "Bell Mobility",
      "Rogers Wireless",
      "Cricket Communications",
      "Saskatchewan Telecommunications Holding",
      "MTS Russia",
      "Vodafone Turkey",
      "T-Mobile Austria",
      "T-Mobile Hungary",
      "SFR",
      "T-Mobile United Kingdom",
      "Telecom Italia",
      "TELCEL",
      "Telenor Hungary",
      "Orange Switzerland",
      "Orange United Kingdom",
      "Telstra Corporation Limited",
      "Virgin Mobile United Kingdom",
      "Wind Mobile Canada",
      "Vodafone Australia",
      "Vodafone Portugal",
      "Cellcom Israel",
      "A1 Telekom Austria",
      "Chunghwa Telecom",
      "Swisscom AG",
      "Taiwan Star Telecom Corporation Limited",
      "FarEasTone Telecommunications",
      "SK Telecom",
      "LG Uplus Corporation",
      "KT Corporation",
      "Movistar Spain",
      "Proximus Belgacom Mobile",
      "Taiwan Mobile",
      "SingTel Optus Pty Limited"
        ],
        "os": [
      "Apple iOS 11"
    ]
  }
];

export default createAsyncStore(() => fetch('/brands').then(res => res.json()));
