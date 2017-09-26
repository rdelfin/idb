// @flow

export type Match = {
  params: {[key: string]: string},
  isExact: boolean,
  path: string,
  url: string,
};
