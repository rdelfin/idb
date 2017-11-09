// @flow
import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import type {FuseMatches, ReactChildren} from './types';

export function joinLines(arr: Array<string>) {
  const ret = [];
  arr.forEach((item, i) => {
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
): Array<[number, number]> {
  const match = matches.find(match => match.key === prop);
  if (match) {
    return match.indices;
  }
  return [];
}
