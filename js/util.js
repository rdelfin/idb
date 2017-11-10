// @flow
import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import type {FuseMatches, ReactChildren} from './types';

export function joinLines(arr: Array<string> | string) {
  if (typeof arr === 'string') {
    return arr;
  }
  const ret = [];
  arr.forEach((item, i) => {
    if (!item || !item.length) return;
    ret.push(<span key={i * 2}>{item}</span>);
    ret.push(<br key={i * 2 + 1} />);
  });
  return ret;
}

export function joinLinkLines(
  arr: Array<string>,
  modelName: string,
  getId: string => number,
) {
  const ret = [];
  arr.forEach((item, i) => {
    const id = getId(item);
    if (id === -1)
      ret.push(<span key={i * 2}>{item}</span>);
    else
      ret.push(<Link key={i * 2} to={`/${modelName}/${id}`}>{item}</Link>)
    ret.push(<br key={i * 2 + 1} />);
  });
  return ret;
}

export function getRangesForProp(
  matches: Array<FuseMatches>,
  prop: string,
  arrayIndex?: number,
): Array<[number, number]> {
  let match = matches.filter(match => match.key === prop);
  if (match.length) {
    if (arrayIndex !== undefined) {
      match = match.find(m => m.arrayIndex === arrayIndex);
      if (match)
        return match.indices;
      return [];
    }
    return match[0].indices;
  }
  return [];
}

export function getPaginationDisplayRange(curr: number, numPages: number): [number, number] {
  // Window of 3 pages on each side, 
  let lo = Math.max(0, curr - 3);
  let hi = Math.min(numPages - 1, curr + 3);
  while (hi - lo < 6) {
    if (lo > 0) {
      lo--;
    } else if (hi < numPages - 1) {
      hi++;
    } else {
      break;
    }
  }
  return [lo, hi];
}
