// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/PhoneModels';

export default class PhoneHome extends React.Component {
  getList() {
    return getAll().map((model, i) => ({
      url: `/phones/${i}`,
      title: model.name,
      stats: [
        `Released ${model.release_date}`,
        model.physical_attributes.dimensions,
        model.physical_attributes.mass,
        model.hardware.cpu.model,
        model.display.resolution,
      ],
    }));
  }

  render() {
    return (
      <ListPage title="Phones" links={this.getList()} />
      );
  }
}
