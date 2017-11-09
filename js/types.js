// @flow

export type Match = {
  params: {[key: string]: string},
  isExact: boolean,
  path: string,
  url: string,
};

export type ReactChildren<T> = React$Element<T> | string | Array<ReactChildren<T>>;

export type FuseOptions<T> = {
  // id?: string,
  caseSensitive?: boolean,
  shouldSort?: boolean,
  tokenize?: boolean,
  matchAllTokens?: boolean,
  findAllMatches?: boolean,
  includeScore?: boolean,
  includeMatches?: boolean,
  threshold?: number,
  location?: number,
  distance?: number,
  maxPatternLength?: number,
  minMatchCharLength?: 1,
  keys: Array<string>,
};

export interface Fuse<T> {
  constructor(list: Array<T>, options: FuseOptions<T>): void;
  search(str: string): Array<FuseResult<T>>;
}

export type FuseResult<T> = {
  item: T,
  matches: Array<FuseMatches>,
};

export type FuseMatches = {
  indices: Array<[number, number]>,
  key: string,
  arrayIndex?: number,
};
