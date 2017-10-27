// @flow
import React, {PureComponent} from 'react';
import Manufacturers from '../../store/Manufacturers';
import Os from '../../store/Os';
import PhoneModels from '../../store/PhoneModels';
import Spinner from '../Spinner';
import TablePage from '../TablePage';
import {joinLines, joinLinkLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Os as OsData} from '../../store/Os';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

type State = {
  data: ?OsData,
  loading: boolean,
};

export default class OsPage extends PureComponent {
  state: State = {
    data: null,
    loading: true,
  };

  componentDidMount() {
    Promise.all([
      Os.getById(this.props.match.params.os),
      Manufacturers.fetch(),
      PhoneModels.fetch(),
    ]).then(([data, ..._]) => {
      this.setState({data, loading: false});
    });
  }

  getTables(os: OsData): Array<TableSpec> {
    return [
      {
        title: 'General',
        icon: 'star',
        rows: [
          {
            title: 'Developer',
            shown: os.developer,
            value: () => os.developer,
          },
          {
            title: 'Released',
            shown: os.release_date,
            value: () => os.release_date,
          },
          {
            title: 'Codename',
            shown: os.codename,
            value: () => os.codename,
          },
          {
            title: 'Kernel',
            shown: os.os_kernel,
            value: () => os.os_kernel,
          },
          {
            title: 'ISAs',
            shown: os.supported_cpu_instruction_sets,
            value: () => joinLines(os.supported_cpu_instruction_sets),
          },
        ],
      },
      {
        title: 'Links',
        icon: 'link',
        rows: [
          {
            title: 'Brands',
            shown: os.brands,
            value: () => joinLinkLines(os.brands, 'manufacturers', Manufacturers.getIdByNameSync),
          },
          {
            title: 'Phone Models',
            shown: os.models,
            value: () => joinLinkLines(os.models, 'phones', PhoneModels.getIdByNameSync),
          },
        ],
      },
      {
        title: 'Logo',
        icon: 'address-card',
        image: os.image,
      },
    ];
  }

  render() {
    const {os} = this.props.match.params;
    const osData = this.state.data;
    if (!osData)
      return <Spinner marginTop={true} />
    return (
      <TablePage title={osData.name} image={osData.image} tables={this.getTables(osData)} />
    );
  }
}
