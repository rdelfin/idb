// @flow
import Fuse from 'fuse.js';
import type {Fuse as FuseType, FuseResult, FuseMatches} from './types';

export default class FilterSort<T: {name: string}> {
  source: Array<T>;
  fuse: FuseType<T>;
  search: string;
  sortKey: $Keys<T>;
  pageSize: number;
  filtered: Array<FuseResult<T>>;

  constructor(
    source: Array<T>,
    initSearch: string = '',
    initSortKey: $Keys<T> = 'name',
    initPageSize: number = 10,
  ) {
    this.source = source;
    this.fuse = new Fuse(source, {
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: true,
      includeMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name"],
    });
    this.search = initSearch;
    this.sortKey = initSortKey;
    this.pageSize = initPageSize;
    this.filtered = this._filter();
  }

  setFilterParams(
    search: string,
    sortKey: $Keys<T>,
    pageSize: number,
  ): number {
    if (this.search !== search || this.sortKey !== sortKey) {
      this.search = search;
      this.sortKey = sortKey;
      this.filtered = this._filter();
    }
    this.pageSize = pageSize;
    return this.getNumPages();
  }

  getPage(page: number): Array<FuseResult<T>> {
    return this.filtered.slice(page * this.pageSize, this.pageSize);
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
    }
    filtered.sort((a, b) => +(a.item[this.sortKey] < b.item[this.sortKey]));
    return filtered;
  }
}
