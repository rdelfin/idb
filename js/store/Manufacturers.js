// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';

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

export const sortKeys: Array<KeyDef> = [
  {
    path: 'name',
    displayName: 'Name',
  },
];

export default createAsyncStore(() => fetch('/brands').then(res => res.json()));
