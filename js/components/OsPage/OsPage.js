// @flow
import React, {PureComponent} from 'react';
import {getById} from '../../store/Os';
import TablePage from '../TablePage';
import {joinLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Os} from '../../store/Os';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

export default class OsPage extends PureComponent<void, Props, void> {
  getTables(os: Os): Array<TableSpec> {
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
      }
    ];
  }

  render() {
    const {os} = this.props.match.params;
    const osData = getById(os);
    if (!osData)
      return <div />
    return (
      <TablePage title={osData.name} tables={this.getTables(osData)} />
    );
  }
}
