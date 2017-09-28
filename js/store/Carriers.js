// @flow

export type Carrier = {
  name: string,
  short_name?: string,
  cellular_networks: CellularNetworks,
  supported_data_links: Array<string>,
  covered_countries: Array<string>,
  brands: Array<string>,
  models: Array<string>,
};

export type CellularNetworks = {
  installed: Array<string>,
};


export type Camcorder = {
  resolution?: string,
  formats?: string,
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
  }
];

export function getById(id: string | number): Carrier | void {
  return data[+id];
}

export function getAll(): Array<Carrier> {
  return data;
}
