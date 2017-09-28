// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/Carriers';

export default class CarrierHome extends React.Component {
  getList() {
    return getAll().map((carrier, i) => ({
      url: `/carriers/${i}`,
      title: carrier.short_name,
      stats: carrier.cellular_networks.installed,
    }));
  }

  render() {
    return (
      <ListPage title="Carriers" links={this.getList()} />
      );
  }
}
