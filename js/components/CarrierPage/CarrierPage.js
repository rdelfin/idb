// @flow
import React, {PureComponent} from 'react';
import Carriers from '../../store/Carriers';
import Manufacturers from '../../store/Manufacturers';
import PhoneModels from '../../store/PhoneModels';
import Spinner from '../Spinner';
import TablePage from '../TablePage';
import {joinLines, joinLinkLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Carrier} from '../../store/Carriers';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

type State = {
  data: ?Carrier,
  loading: boolean,
};

export default class CarrierPage extends PureComponent {
  state: State = {
    data: null,
    loading: true,
  };

  componentDidMount() {
    Promise.all([
      Carriers.getById(this.props.match.params.carrier),
      Manufacturers.fetch(),
      PhoneModels.fetch(),
    ]).then(([data, ..._]) => {
      this.setState({data, loading: false});
    });
  }

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
            shown: carrier.cellular_networks,
            value: () => carrier.cellular_networks,
          },
        ],
      },
      {
        title: 'Links',
        icon: 'link',
        rows: [
          {
            title: 'Brands',
            shown: carrier.brands,
            value: () => joinLinkLines(carrier.brands, 'manufacturers', Manufacturers.getIdByNameSync),
          },
          {
            title: 'Phone Models',
            shown: carrier.models,
            value: () => joinLinkLines(carrier.models, 'phones', PhoneModels.getIdByNameSync),
          },
        ],
      },
      {
        title: 'Logo',
        icon: 'address-card',
        image: carrier.image,
      },
    ];
  }

  render() {
    const carrierData = this.state.data;
    if (!carrierData)
      return <Spinner marginTop={true} />;
    return (
      <TablePage title={carrierData.name} image={carrierData.image} tables={this.getTables(carrierData)} />
    );
  }
}
