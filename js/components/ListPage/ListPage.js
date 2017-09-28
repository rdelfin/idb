// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import type {ReactChildren} from '../../types';
import './listPage.css';

type Props = {
  title: ReactChildren<*>,
  links: Array<LinkSpec>,
};

export type LinkSpec = {
  url: string,
  title: ReactChildren<*>,
  stats: Array<ReactChildren<*>>,
};

const ListPage = (props: Props): React$Element<*> => (
  <div styleName="root">
    <h1 styleName="title">{props.title}</h1>
    {props.links.map(({url, title, stats}) => (
      <Link key={url} to={url} styleName="item">
        <div styleName="name">{title}</div>
        <div styleName="stats">
          {stats.map((stat, i) => <div key={i}>{stat}</div>)}
        </div>
      </Link>
    ))}
  </div>
);

export default ListPage;
