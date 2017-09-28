// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/OperatingSystems';

export default class OsHome extends React.Component {
  getList() {
    return getAll().map((os, i) => ({
      url: `/operating_systems/${i}`,
      title: os.name,
    }));
  }

  render() {
    return (
      <ListPage title="Operating Systems" links={this.getList()} />
      );
  }
}
