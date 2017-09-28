// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/Os';

export default class PhoneHome extends React.Component {
  getList() {
    return getAll().map((os, i) => ({
      url: `/os/${i}`,
      title: os.name,
    }));
  }

  render() {
    return (
      <ListPage title="Operating Systems" links={this.getList()} />
      );
  }
}
