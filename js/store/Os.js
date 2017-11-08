// @flow
import {createAsyncStore, delayedPromisify} from './util';
import type {KeyDef} from './util';

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
];

export default createAsyncStore(() => fetch('/os').then(res => res.json()));
