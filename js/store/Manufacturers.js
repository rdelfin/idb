// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';
import type {LinkSpec} from '../components/ListPage/ListPage';

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
  {
    path: 'type',
    displayName: 'Funding Type',
  },
  {
    path: 'found_date',
    displayName: 'Date Founded',
  },
  {
    path: 'location',
    displayName: 'Location',
  },
];

export function getLinkSpecs(mfs: Array<Manufacturer>): Array<LinkSpec> {
  return mfs.map((manufacturer, i) => ({
    url: `/manufacturers/${i}`,
    title: manufacturer.name,
    stats: _.at(manufacturer, [
      'type',
      'found_date',
      'location',
      'area_served',
    ]),
    spec: manufacturer,
  }));
}

export default createAsyncStore(() => fetch('/brands').then(res => res.json()));
