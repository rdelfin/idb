// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';
import type {LinkSpec} from '../components/ListPage/ListPage';

export type Os = {
  image: string,
  name: string,
  developer: string,
  release_date: string,
  version: string,
  codename?: string,
  os_kernel: string,
  os_family: string,
  supported_cpu_instruction_sets: Array<string>,
  predecessor: string,
  successor?: string,
  brands: Array<string>,
  models: Array<string>,
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
    path: 'developer',
    displayName: 'Developer',
  },
  {
    path: 'os_kernel',
    displayName: 'Kernel',
  },
  {
    path: 'family',
    displayName: 'Family',
  },
];

export function getLinkSpecs(os: Array<Os>): Array<LinkSpec> {
  return os.map((os, i) => ({
    url: `/os/${i}`,
    title: os.name,
    stats: [
      os.release_date && `Released ${os.release_date}`,
      os.developer,
      os.os_kernel && `${os.os_kernel} kernel`,
      os.os_family,
    ].concat(os.supported_cpu_instruction_sets),
    spec: os,
  }));
}

export default createAsyncStore(() => fetch('/os').then(res => res.json()));
