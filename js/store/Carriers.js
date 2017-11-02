// @flow
import {createAsyncStore, delayedPromisify} from './util';

export type Carrier = {
  image: string,
  name: string,
  short_name: string,
  cellular_networks: Array<string>,
  covered_countries: string | Array<string>,
  brands: Array<string>,
  models: Array<string>,
};

export default createAsyncStore(() => fetch('/carriers').then(res => res.json()));
