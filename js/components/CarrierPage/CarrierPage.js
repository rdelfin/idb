// @flow
import React, {PureComponent} from 'react';
import {getById} from '../../store/Carriers';
import TablePage from '../TablePage';
import {joinLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Carrier} from '../../store/Carriers';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

export default class CarrierPage extends PureComponent<void, Props, void> {
  getTables(carrier: Carrier): Array<TableSpec> {
    return [
      {
        title: 'General',
        icon: 'star',
        rows: [
          {
            title: 'Countries',
            shown: carrier.covered_countries,
            value: () => carrier.covered_countries,
          },
          {
            title: 'Networks',
            shown: carrier.cellular_networks.installed,
            value: () => joinLines(carrier.cellular_networks.installed),
          },
          {
            title: 'Data Links',
            shown: carrier.cellular_networks.supported_data_links,
            value: () => joinLines(carrier.cellular_networks.supported_data_links),
          },
        ],
      },
    ];
  }

  render() {
    const {carrier} = this.props.match.params;
    const carrierData = getById(carrier);
    if (!carrierData)
      return <div />;
    return (
      <TablePage title={carrierData.name} tables={this.getTables(carrierData)} />
    );
  }
}
