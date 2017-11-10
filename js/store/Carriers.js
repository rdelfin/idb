// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';
import type {LinkSpec} from '../components/ListPage/ListPage';

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

export function getLinkSpecs(carriers: Array<Carrier>): Array<LinkSpec> {
  return carriers.map((carrier, i) => ({
    url: `/carriers/${i}`,
    title: carrier.short_name || carrier.name,
    stats: Array.isArray(carrier.covered_countries) ?
        carrier.covered_countries : [carrier.covered_countries]
      .concat(carrier.cellular_networks || []),
    spec: carrier,
  }));
}

export default createAsyncStore(() => fetch('/carriers').then(res => res.json()));
