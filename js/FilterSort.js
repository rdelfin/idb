// @flow
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

export default class FilterSort<T: {title: string}> {
  source: Array<T>;
  fuse: FuseType<T>;
  search: string;
  sortKey: $Keys<T>;
  pageSize: number;
  filtered: Array<FuseResult<T>>;

  constructor(
    source: Array<T>,
    initSearch: string = '',
    initSortKey: $Keys<T> = 'title',
    initPageSize: number = 20,
  ) {
    this.source = source;
    this.fuse = new Fuse(source, FUSE_OPTIONS);
    this.search = initSearch;
    this.sortKey = initSortKey;
    this.pageSize = initPageSize;
    this.filtered = this._filter();
  }

  setSource(source: Array<T>): void {
    this.source = source;
    this.fuse = new Fuse(source, FUSE_OPTIONS);
    this.filtered = this._filter();
  }

  setFilterParams({source, search, sortKey, pageSize}: {
    source?: Array<T>,
    search?: string,
    sortKey?: $Keys<T>,
    pageSize?: number,
  }): number {
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
      filtered.sort((a, b) => +(a.item[this.sortKey] < b.item[this.sortKey]));
    }
    return filtered;
  }
}
