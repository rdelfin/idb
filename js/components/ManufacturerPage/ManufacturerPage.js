// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import Carriers from '../../store/Carriers';
import Manufacturers from '../../store/Manufacturers';
import PhoneModels from '../../store/PhoneModels';
import Os from '../../store/Os';
import Spinner from '../Spinner';
import TablePage from '../TablePage';
import {joinLines, joinLinkLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Manufacturer} from '../../store/Manufacturers';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

type State = {
  data: ?Manufacturer,
  loading: boolean,
};

export default class ManufacturerPage extends PureComponent {
  state: State = {
    data: null,
    loading: true,
  };

  componentDidMount() {
    Promise.all([
      Manufacturers.getById(this.props.match.params.manufacturer),
      Carriers.fetch(),
      PhoneModels.fetch(),
      Os.fetch(),
    ]).then(([data, ..._]) => {
      this.setState({data, loading: false});
    });
  }

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
      },
      {
        title: 'Links',
        icon: 'link',
        rows: [
          {
            title: 'Phone Models',
            shown: mf.phone_models && mf.phone_models.length,
            value: () => joinLinkLines(mf.phone_models, 'phones', PhoneModels.getIdByNameSync),
          },
          {
            title: 'Carriers',
            shown: mf.carriers && mf.carriers.length,
            value: () => joinLinkLines(mf.carriers, 'carriers', Carriers.getIdByNameSync),
          },
          {
            title: 'OSs',
            shown: mf.os && mf.os.length,
            value: () => joinLinkLines(mf.os, 'os', Os.getIdByNameSync),
          },
        ],
      },
      {
        title: 'Logo',
        icon: 'address-card',
        image: mf.image,
      },
    ];
  }

  render() {
    const manufacturerData = this.state.data;
    if (!manufacturerData)
      return <Spinner marginTop={true} />;
    return (
      <TablePage
        title={manufacturerData.name}
        image={manufacturerData.image}
        tables={this.getTables(manufacturerData)}
        loading={this.state.loading} />
    );
  }
}
