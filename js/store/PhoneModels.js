// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';

export type PhoneModel = {
  image: string,
  name: string,
  brand: string,
  model: string,
  release_date: string,
  announce_date?: string,
  hardware_designer: string,
  manufacturers: string | Array<string>,
  carriers?: Array<string>,
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

export const sortKeys: Array<KeyDef> = [
  {
    path: 'name',
    displayName: 'Name',
  },
  {
    path: 'release_date',
    displayName: 'Release Date',
  },
  {
    path: 'physical_attributes.dimensions',
    displayName: 'Dimensions',
  },
  {
    path: 'physical_attributes.mass',
    displayName: 'Mass',
  },
  {
    path: 'display.resolution',
    displayName: 'Display Resolution',
  },
];

export default createAsyncStore(() => fetch('/models').then(res => res.json()));
