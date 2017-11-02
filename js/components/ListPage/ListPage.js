// @flow
import React from 'react';
import throttle from 'throttle-debounce/throttle';
import {Link} from 'react-router-dom';
import ListPageList from '../ListPageList';
import Spinner from '../Spinner';
import type {ReactChildren} from '../../types';
import './listPage.css';

type Props = {
  title: ReactChildren<*>,
  links: Array<LinkSpec>,
  loading: boolean,
};

export type LinkSpec = {
  url: string,
  title: ReactChildren<*>,
  stats: Array<string>,
};

export default class ListPage extends React.PureComponent {
  props: Props;

  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div styleName="root">
        <h1 styleName="title">{this.props.title}</h1>
        {this.props.loading && <Spinner />}
        <ListPageList links={this.props.links} loading={this.props.loading} />
      </div>
    );
  }
}
