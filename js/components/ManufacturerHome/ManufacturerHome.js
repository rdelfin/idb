// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/Manufacturers';

export default class ManufacturerHome extends React.Component {
  getList() {
    return getAll().map((manufacturer, i) => ({
      url: `/manufacturers/${i}`,
      title: manufacturer.name,
      stats: [
        manufacturer.type,
        manufacturer.industries[0],
        `Founded ${manufacturer.found_date}`,
        manufacturer.location,
        manufacturer.area_served,
      ],
    }));
  }

  render() {
    return (
      <ListPage title="Manufacturers" links={this.getList()} />
      );
  }
}
