// @flow

export type PhoneModel = {
  name: string,
  brand: string,
  model: string,
  release_date: string,
  announce_date?: string,
  hardware_designer: string,
  manufacturers: string | Array<string>,
  codename?: string,
  market_countries: string | Array<string>,
  market_regions: string | Array<string>,
  vendor?: string,
  physical_attributes: PhysicalAttributes,
  software: Software,
  hardware: Hardware,
  display: Display,
  cameras: Array<Camera>,
};

export type PhysicalAttributes = {
  width: string,
  height: string,
  depth: string,
  dimensions: string,
  mass: string,
};

export type Software = {
  platform: string,
  os: string,
  software_extras: Array<string>,
};

export type Hardware = {
  cpu: Cpu,
  gpu?: Gpu,
  ram: Ram,
  nonvolatile_memory: NonvolatileMemory,
};

export type Cpu = {
  model: string,
  additional_info: Array<string>,
  clock_speed: string,
};

export type Gpu = {
  model: string,
  clock_speed?: string,
};

export type Ram = {
  type: string,
  capacity: string,
};

export type NonvolatileMemory = {
  type: string,
  capacity: string,
};

export type Display = {
  resolution: string,
  diagonal: string,
  width?: string,
  height?: string,
  bezel_width: string,
  area_utilization?: string,
  pixel_density?: string,
  type?: string,
  color_depth?: string,
  screen?: string,
};

export type Camera = {
  placement: string,
  module?: string,
  sensor: string,
  sensor_format?: string,
  resolution?: string,
  num_pixels: string,
  aperture: string,
  optical_zoom: string,
  digital_zoom?: string,
  focus?: Array<string>,
  formats?: string,
  camcorder?: Camcorder,
  flash?: string,
};

export type Camcorder = {
  resolution?: string,
  formats?: string,
};

const data: Array<PhoneModel> = [
  {
        "name": "LG LS998 V30+ TD-LTE / AS998  (LG Joan)",
        "brand": "LG",
        "model": "LS998 V30+ TD-LTE / AS998",
        "release_date": "2017 Oct",
        "announce_date": "2017 Sep",
        "hardware_designer": "LG Electronics",
        "manufacturers": ["LG Electronics"],
        "codename": "LG Joan",
        "market_countries": ["USA"],
        "market_regions": ["North America"],
        "carriers": ["Sprint Nextel Corporation"],
        "physical_attributes": {
            "width": "75.4 mm",
            "height": "151.7 mm",
            "depth": "7.3 mm",
            "dimensions": "2.97x5.97x0.29 inches",
            "mass": "158 g"
        },
        "software": {
            "platform": "Android",
            "os": "Google Android 7.1.2 (Nougat)",
            "software_extras": [
                "Voice Command", 
                "Navigation software", 
                "Virtual Reality (VR) support", 
                "Intelligent personal assisstant", 
                "Voice Recognition", 
                "Face Recognition"
            ]
        },
        "hardware": {
            "cpu": {
                "model": "Qualcomm Snapdragon 835 MSM8998", 
                "additional_info": [
                    "2017",
                    "64 bit", 
                    "octa-core", 
                    "32 Kbyte I-Cache",
                    "32 Kbyte D-Cache", 
                    "2048 Kbyte L2", 
                    "10 nm", 
                    "Qualcomm Adreno 540 GPU"
                ],
                "clock_speed": "2350 MHz"
            },
            "gpu": {
                "model": "Qualcomm Adreno 540",
                "clock_speed": "710 MHz"
            },
            "ram": {
                "type": "LPDDR4x SDRAM 1866 MHz",
                "capacity": "4.00 GiB RAM"
            },
            "nonvolatile_memory": {
                "type": "Flash EEPROM",
                "capacity": "128.0 GB ROM"
            }
        },
        "display": {
            "resolution": "1440x2880",
            "diagonal": "152.2 mm",
            "width": "68.07 mm",
            "height": "136.13 mm",
            "bezel_width": "7.33 mm",
            "area_utilization": "81%",
            "pixel_density": "537 PPI",
            "type": "Color AM-OLED",
            "color_depth": "24 bit/pixel",
            "screen": "Corning Gorilla Glass 5"
        },
        "cameras": [
            {
                "placement": "Rear",
                "module": "Sony IMX351",
                "sensor": "BSI CMOS",
                "resolution": "4608x3456 pixel",
                "num_pixels": "15.9 MP cam",
                "aperture": "f/1.60",
                "optical_zoom": "1 x",
                "digital_zoom": "8 x",
                "focus": [
                    "Contrast Detection Autofocus (CD AF)",
                    "Phase-Detection Autofocus (PD AF)",
                    "Laser Autofocus"
                ],
                "formats": "JPG, RAW (raw format)",
                "camcorder": {
                    "resolution": "3840x2160 pixel",
                    "formats": "3GP, 3G2, MPEG4"
                },
                "flash": "dual LED"
            },
            {
                "placement": "Front",
                "sensor": "CMOS",
                "sensor_format": "1/5.00",
                "resolution": "2592x1944 pixel",
                "num_pixels": "5.0 MP sec. cam",
                "aperture": "f/1.90",
                "optical_zoom": "1 x",
                "formats": "JPG, RAW (raw format)",
                "camcorder": {
                    "resolution": "1920x1080 pixel",
                    "formats": "3GP, 3G2, MPEG4"
                }
            }
        ]
  },
  {
        "name": "Samsung SM-G892U Galaxy S8 Active TD-LTE",
        "brand": "Samsung",
        "model": "SM-G982U Galaxy S8 Active TD-LTE",
        "release_date": "2017 Oct",
        "hardware_designer": "Samsung Electronics",
        "manufacturers": ["Samsung Electronics"],
        "market_countries": ["USA"],
        "market_regions": ["North America"],
        "physical_attributes": {
            "width": "74.9 mm",
            "height": "151.9 mm",
            "depth": "9.9 mm",
            "dimensions": "2.95x5.98x0.39 inches",
            "mass": "208 g"
        },
        "software": {
            "platform": "Android",
            "os": "Google Android 7.0 (Nougat)",
            "software_extras": [
                "Voice Command", 
                "Navigation software", 
        "Augmented Reality (AR)",
                "Virtual Reality (VR) support", 
                "Intelligent personal assisstant",
                "Face Recognition"
            ]
        },
        "hardware": {
            "cpu": {
                "model": "Qualcomm Snapdragon 835 MSM8998", 
                "additional_info": [
                    "2017",
                    "64 bit", 
                    "octa-core", 
                    "32 Kbyte I-Cache",
                    "32 Kbyte D-Cache", 
                    "2048 Kbyte L2", 
                    "10 nm", 
                    "Qualcomm Adreno 540 GPU"
                ],
                "clock_speed": "2350 MHz"
            },
            "gpu": {
                "model": "Qualcomm Adreno 540",
            },
            "ram": {
                "type": "LPDDR4 SDRAM 1866 MHz",
                "capacity": "4.00 GiB RAM"
            },
            "nonvolatile_memory": {
                "type": "Flash EEPROM",
                "capacity": "64.0 GB ROM"
            }
        },
        "display": {
            "resolution": "1440x2880",
            "diagonal": "147 mm",
            "bezel_width": "10.59 mm",
            "area_utilization": "75%",
            "pixel_density": "569 PPI",
            "type": "Color AM-OLED",
            "color_depth": "24 bit/pixel",
            "screen": "Gorilla Glass 5"
        },
        "cameras": [
            {
                "placement": "Rear",
                "sensor": "BSI CMOS",
                "num_pixels": "12.2 MP cam",
                "aperture": "f/1.70",
                "optical_zoom": "1 x",
                "digital_zoom": "8 x",
                "focus": [
                    "CD AF",
                    "PD AF",
                ],
                "camcorder": {
                    "resolution": "4096x2160 pixel",
                },
                "flash": "dual LED"
            },
            {
                "placement": "Front",
                "sensor": "BSI CMOS",
                "num_pixels": "8.0 MP sec. cam",
                "aperture": "f/1.70",
                "optical_zoom": "1 x",
        "focus": [
          "CD AF"
        ]
            }
        ]
  },
  {
        "name": "Apple iPhone 8 Plus A1897 TD-LTE 256GB (Apple iPhone 10,5)",
        "brand": "Apple",
        "model": "iPhone 8 Plus A1897 TD-LTE 256GB",
        "release_date": "2017 Sep",
        "announce_date": "2017 Sep",
        "hardware_designer": "Apple",
        "manufacturers": [
      "Foxconn",
      "Pegatron"
    ],
        "market_countries": [
      "Australia",
      "Argentina",
      "Austria",
      "Belgium",
      "Brazil",
      "Bulgaria",
      "Canada",
      "Chile",
      "Costa Rica",
      "Croatia",
      "Czech",
      "Denmark",
      "Egypt",
      "Ecuador",
      "Finland",
      "France",
      "Greece",
      "Germany",
      "HK",
      "Hungary",
      "Israel",
      "Ireland",
      "Italy",
      "India",
      "Iran",
      "Indonesia",
      "Kazakhstan",
      "Kuwait",
      "Latvia",
      "Mexico",
      "Malaysia",
      "Netherlands",
      "NZ",
      "Norway",
      "Panama",
      "Pakistan",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Romania",
      "Russia",
      "Saudi Arabia",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Switzerland",
      "Sweden",
      "Sri Lanka",
      "Taiwan",
      "Thailand",
      "Turkey",
      "UAE",
      "UK",
      "USA",
      "Ukraine",
      "Vietnam"
    ],
        "market_regions": [
      "Africa",
      "Asia",
      "Australia",
      "Central America",
      "Eastern Europe",
      "Middle East",
      "North America",
      "Oceania",
      "South America",
      "Southeast Asia",
      "Western Europe",
      "Worldwide"
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
        "physical_attributes": {
            "width": "78.1 mm",
            "height": "158.4 mm",
            "depth": "7.5 mm",
            "dimensions": "3.07x6.24x0.30 inches",
            "mass": "202 g"
        },
        "software": {
            "platform": "iOS",
            "os": "Apple iOS 11",
            "software_extras": [
                "Voice Command", 
                "Navigation software", 
        "Augmented Reality (AR)",
                "Intelligent personal assisstant"
            ]
        },
        "hardware": {
            "cpu": {
                "model": "Apple A11 Bionic (T8015)", 
                "additional_info": [
                    "2017",
                    "64 bit", 
                    "hexa-core",
          "64 Kbyte I-Cache",
          "64 Kbyte D-Cache",
          "8192 Kbyte L2",
          "10 nm"
                ],
                "clock_speed": "2376 MHz"
            },
            "ram": {
                "type": "LPDDR4 SDRAM 1866 MHz",
                "capacity": "3.00 GiB RAM"
            },
            "nonvolatile_memory": {
                "type": "Flash EEPROM",
                "capacity": "256.0 GB ROM"
            }
        },
        "display": {
            "resolution": "1080x1920",
            "diagonal": "139 mm",
            "bezel_width": "9.95 mm",
            "area_utilization": "67%",
            "pixel_density": "403 PPI",
            "type": "Color IPS TFT LCD"
        },
        "cameras": [
            {
                "placement": "Rear",
                "sensor": "BSI CMOS",
                "num_pixels": "12.0 MP cam",
                "aperture": "f/1.80",
                "optical_zoom": "2 x",
                "digital_zoom": "10 x",
                "focus": [
                    "CD AF",
                    "PD AF",
                    "MF"
                ],
                "camcorder": {
                    "resolution": "3840x2160 pixel"
                },
                "flash": "quad LED"
            },
            {
                "placement": "Front",
                "sensor": "BSI CMOS",
                "num_pixels": "7.1 MP sec. cam",
                "aperture": "f/2.20",
                "optical_zoom": "1 x",
                "camcorder": {
                    "resolution": "1920x1080 pixel"
                }
            }
        ]
  }
];

export function getById(id: string | number): PhoneModel | void {
  return data[+id];
}

export function getAll(): Array<PhoneModel> {
  return data;
}
