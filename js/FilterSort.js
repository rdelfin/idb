// @flow
import _ from 'lodash';
import Fuse from 'fuse.js';
import type {Fuse as FuseType, FuseResult, FuseMatches} from './types';

const FUSE_OPTIONS = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  includeMatches: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title"],
};

type Options<T> = {
  source?: Array<T>,
  search?: string,
  sortKey?: string,
  sortDesc?: boolean,
  pageSize?: number,
};

export default class FilterSort<T: {title: string, spec: Object}> {
  source: Array<T>;
  fuse: FuseType<T>;
  search: string;
  sortKey: string;
  sortDesc: boolean;
  pageSize: number;
  filtered: Array<FuseResult<T>>;

  constructor(
    source: Array<T>,
    {search, sortKey, sortDesc, pageSize}: Options<T> = {},
  ) {
    this.source = source;
    this.fuse = new Fuse(source, FUSE_OPTIONS);
    this.search = search || '';
    this.sortKey = sortKey || 'name';
    this.sortDesc = !!sortDesc;
    this.pageSize = pageSize || 20;
    this.filtered = this._filter();
  }

  setSource(source: Array<T>): void {
    this.source = source;
    this.fuse = new Fuse(source, FUSE_OPTIONS);
    this.filtered = this._filter();
  }

  setFilterParams({source, search, sortKey, sortDesc, pageSize}: Options<T>): number {
    let shouldRefilter = false;
    if (source != null && this.source !== source) {
      this.source = source;
      this.fuse = new Fuse(source, FUSE_OPTIONS);
      shouldRefilter = true;
    }
    if (search != null && this.search !== search) {
      shouldRefilter = true;
      this.search = search;
    }
    if (sortKey != null && this.sortKey !== sortKey) {
      shouldRefilter = true;
      this.sortKey = sortKey;
    }
    if (sortDesc != null && this.sortDesc !== sortDesc) {
      shouldRefilter = true;
      this.sortDesc = sortDesc;
    }
    if (shouldRefilter) {
      this.filtered = this._filter();
    }
    if (pageSize != null) {
      this.pageSize = pageSize;
    }
    return this.getNumPages();
  }

  getPage(page: number): Array<FuseResult<T>> {
    const start = page * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  getNumPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  _filter(): Array<FuseResult<T>> {
    let filtered;
    if (this.search.length) {
      filtered = this.fuse.search(this.search);
    } else {
      filtered = this.source.map(item => ({item, matches: []}));
      const sortKey = this.sortKey;
      filtered.sort((a, b) =>
        (_.at(a.item.spec, sortKey)[0] || '').toUpperCase().localeCompare(
          (_.at(b.item.spec, sortKey)[0] || '').toUpperCase()));
      if (this.sortDesc)
        filtered.reverse();
    }
    return filtered;
  }
}
