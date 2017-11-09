// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';

export type Carrier = {
  image: string,
  name: string,
  short_name: string,
  cellular_networks: Array<string>,
  covered_countries: string | Array<string>,
  brands: Array<string>,
  models: Array<string>,
};

export const sortKeys: Array<KeyDef> = [
  {
    path: 'name',
    displayName: 'Name',
  },
];

export default createAsyncStore(() => fetch('/carriers').then(res => res.json()));
