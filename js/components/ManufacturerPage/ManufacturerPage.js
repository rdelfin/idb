// @flow
import React, {PureComponent} from 'react';
import {getById} from '../../store/Manufacturers';
import TablePage from '../TablePage';
import {joinLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Manufacturer} from '../../store/Manufacturers';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

export default class ManufacturerPage extends PureComponent<void, Props, void> {
  getTables(mf: Manufacturer): Array<TableSpec> {
    return [
      {
        title: 'General',
        icon: 'star',
        rows: [
          {
            title: 'Location',
            shown: mf.location,
            value: () => mf.location,
          },
          {
            title: 'Founded',
            shown: mf.found_date,
            value: () => mf.found_date,
          },
          {
            title: 'Founders',
            shown: mf.founders,
            value: () => joinLines(mf.founders || []),
          },
          {
            title: 'Industries',
            shown: mf.industries,
            value: () => joinLines(mf.industries || []),
          },
          {
            title: 'Parent',
            shown: mf.parent,
            value: () => mf.parent,
          },
        ],
      }
    ];
  }

  render() {
    const {manufacturer} = this.props.match.params;
    const manufacturerData = getById(manufacturer);
    if (!manufacturerData)
      return <div />
    return (
      <TablePage title={manufacturerData.name} tables={this.getTables(manufacturerData)} />
    );
  }
}
