// @flow
import React from 'react';
import type {ReactChildren} from './types';

export function joinLines(arr: Array<string>): ReactChildren<*> {
  const ret = [];
  arr.forEach((item, i) => {
    ret.push(item);
    ret.push(<br />);
  });
  return ret;
}
