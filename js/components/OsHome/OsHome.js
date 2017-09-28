// @flow
import React from 'react';
import ListPage from '../ListPage';
import {getAll} from '../../store/Os';

export default class OsHome extends React.Component {
  getList() {
    return getAll().map((os, i) => ({
      url: `/os/${i}`,
      title: os.name,
      stats: [
        `Released ${os.release_date}`,
        os.developer,
        `${os.os_kernel} kernel`,
        os.os_family,
      ].concat(os.supported_cpu_instruction_sets),
    }));
  }

  render() {
    return (
      <ListPage title="Operating Systems" links={this.getList()} />
      );
  }
}
