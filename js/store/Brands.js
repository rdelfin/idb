// @flow

export type Brand = {
  name: string,
  type: string,
  industries: Array<string>,
  found_date?: string,
  location: string
  founders?: string,
  parent?: string,
  area_served: string | Array<string>,
  phone_models: Array<string>,
  carriers: Array<string>,
  os: Array<string>,
};


const data: Array<Brand> = [
  {
	"name": "LG",
	"type": "public",
	"industries": [
	  "Consumer electronics",
	  "Home appliances"
	],
	"found_date": "October 1958",
	"founders": [
	  "Koo In-hwoi"
	],
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
  }
];

export function getById(id: string | number): Brand | void {
  return data[+id];
}

export function getAll(): Array<Brand> {
  return data;
}
