// @flow

export type PhoneModel = {
  name: string,
  brand: string,
  model: string,
  release_date: string,
  announce_date: string,
  hardware_designer: string,
  manufacturer: string,
  codename: string,
  market_countries: string,
  market_regions: string,
  vendor: string,
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
  gpu: Gpu,
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
  clock_speed: string,
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
  width: string,
  height: string,
  bezel_width: string,
  area_utilization: string,
  pixel_density: string,
  type: string,
  color_depth: string,
  screen: string,
};

export type Camera = {
  placement: string,
  module?: string,
  sensor: string,
  sensor_format?: string,
  resolution: string,
  num_pixels: string,
  aperture: string,
  optical_zoom: string,
  digital_zoom?: string,
  focus?: Array<string>,
  formats: string,
  camcorder: Camcorder,
  flash?: string,
};

export type Camcorder = {
  resolution: string,
  formats: string,
};

const data: Array<PhoneModel> = [
  {
    "name": "LG LS998 V30+ TD-LTE / AS998  (LG Joan)",
    "brand": "LG",
    "model": "LS998 V30+ TD-LTE / AS998",
    "release_date": "2017 Oct",
    "announce_date": "2017 Sep",
    "hardware_designer": "LG Electronics",
    "manufacturer": "LG Electronics",
    "codename": "LG Joan",
    "market_countries": "USA",
    "market_regions": "North America",
    "vendor": "Sprint Nextel Corporation",
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
        "Intelligent personal assisstent",
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
  }
];

export function getById(id: string | number): PhoneModel | void {
  return data[+id];
}
