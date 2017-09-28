// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/Carriers';

export default class PhoneHome extends React.Component {
  getList() {
    return getAll().map((carrier, i) => ({
      url: `/carriers/${i}`,
      title: carrier.short_name,
    }));
  }

  render() {
    return (
      <ListPage title="Carriers" links={this.getList()} />
      );
  }
}
