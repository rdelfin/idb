// @flow

export type Match = {
  params: {[key: string]: string},
  isExact: boolean,
  path: string,
  url: string,
};

export type ReactChildren<T> = React$Element<T> | string | Array<ReactChildren<T>>;
