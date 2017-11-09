// @flow
import _ from 'lodash';
import Fuse from 'fuse.js';
import type {LinkSpec} from './components/ListPage/ListPage';
import type {Fuse as FuseType, FuseResult, FuseMatches} from './types';

const FUSE_OPTIONS = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  includeMatches: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    {name: 'title', weight: 0.7},
    {name: 'stats', weight: 0.3},
  ],
};

type Options = {
  source?: Array<LinkSpec>,
  search?: string,
  sortKey?: string,
  sortDesc?: boolean,
  pageSize?: number,
};

export default class FilterSort {
  source: Array<LinkSpec>;
  fuse: FuseType<LinkSpec>;
  search: string;
  sortKey: string;
  sortDesc: boolean;
  pageSize: number;
  filtered: Array<FuseResult<any>>;

  constructor(
    source: Array<LinkSpec>,
    {search, sortKey, sortDesc, pageSize}: Options = {},
  ) {
    this.source = source;
    this.fuse = new Fuse(source, FUSE_OPTIONS);
    this.search = search || '';
    this.sortKey = sortKey || 'name';
    this.sortDesc = !!sortDesc;
    this.pageSize = pageSize || 20;
    this.filtered = this._filter();
  }

  setSource(source: Array<LinkSpec>): void {
    this.source = source;
    this.fuse = new Fuse(source, FUSE_OPTIONS);
    this.filtered = this._filter();
  }

  setFilterParams({source, search, sortKey, sortDesc, pageSize}: Options): number {
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

  getPage(page: number): Array<FuseResult<any>> {
    const start = page * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  getNumPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  _filter(): Array<FuseResult<any>> {
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
