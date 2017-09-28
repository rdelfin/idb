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
};

const ListPage = (props: Props): React$Element<*> => (
  <div styleName="root">
    <h1 styleName="title">{props.title}</h1>
    {props.links.map(({url, title}) => (
      <Link key={url} to={url} styleName="item">{title}</Link>
    ))}
  </div>
);

export default ListPage;
