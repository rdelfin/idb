// @flow

export type Carrier = {
  name: string,
  short_name: string,
  cellular_networks: CellularNetworks,
  covered_countries: string | Array<string>,
  brands: Array<string>,
  models: Array<string>,
};

type CellularNetworks = {
  installed: Array<string>,
  supported_data_links: Array<string>,
};

const data: Array<Carrier> = [
  {
        "name": "Sprint Nextel Corporation",
        "short_name": "Sprint",
        "cellular_networks": {
            "installed": [
                "CDMA800 (BC0)",
                "CDMA1900 (BC1/BC14)",
                "CDMA800 (BC10)",
                "iDEN900",
                "iDEN800",
                "LTE1900 (B2)",
                "LTE1900 (B25)"
            ],
            "supported_data_links": [
                "cdmaOne",
                "CDMA2000 1x",
                "CDMA2000 1xEV-DO",
                "CDMA2000 1xEV-DO Rev A",
                "iDEN",
                "LTE 150/50"
            ]
        },
        "covered_countries": "USA",
        "brands": [
            "LG", 
            "Samsung", 
            "HTC"
        ],
        "models": [
            "Motorola Moto Z2 Force Edition TD-LTE XT1789-03",
            "Sprint HTC 10 TD-LTE (HTC Perfume)",
            "Sprint Slate 10 Tablet AQT100 TD-LTE"
        ]
  },
  {
        "name": "AT&T Mobility",
        "short_name": "ATT",
        "cellular_networks": {
            "installed": [
        "GSM850",
        "GSM1900",
        "UMTS1900 (B2)",
        "UMTS850 (B5)",
        "LTE1900 (B2)",
        "LTE1700/2100 (B4)",
        "LTE850 (B5)",
        "LTE700 (B17)"
            ],
            "supported_data_links": [
        "CSD",
        "HSCSD",
        "GPRS",
        "EDGE",
        "UMTS",
        "HSUPA",
        "HSDPA",
        "HSPA+ 21.1",
        "LTE",
                "LTE 150/50",
        "LTE 300/50"
            ]
        },
        "covered_countries": "USA",
        "brands": [
            "Motorola", 
            "Asus", 
            "HTC"
        ],
        "models": [
            "Motorola Moto Z2 Force Edition TD-LTE XT1789-04",
            "HTX Desire 530 4G LTE NA (HTC A16)",
            "Apple iPhone 8 Plus A1897 TD-LTE 256GB (Apple iPhone 10,5)"
        ]
  },
  {
        "name": "SoftBank Corp.",
        "short_name": "SoftBank",
        "cellular_networks": {
            "installed": [
        "UMTS2100 (B1)",
        "UMTS900 (B8)",
        "UMTS1500 (B11)",
        "LTE2100 (B1)",
        "LTE900 (B8)",
        "LTE1700/1800 (B9)",
        "TD-LTE2500 (B41)"
            ],
            "supported_data_links": [
        "UMTS",
        "HSUPA",
        "HSDPA",
        "HSPA+ 21.1",
        "LTE",
        "LTE 300/50"
            ]
        },
        "covered_countries": "Japan",
        "brands": [
            "Kyocera", 
            "Lenovo", 
            "Sharp"
        ],
        "models": [
            "Kyocera Digno G TD-LTE 602KC",
            "SoftBank Lenovo 503LV TD-LTE Dual SIM",
            "Sharp AQUOS Crystal X 2 WiMAX 2+ 403 SH / Crystal Y2"
        ]
  }
];

export function getById(id: string | number): Carrier | void {
  return data[+id];
}

export function getAll(): Array<Carrier> {
  return data;
}
