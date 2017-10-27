// @flow
import React from 'react';
import ListPage from '../ListPage';
import Os from '../../store/Os';
import type {Os as OsData} from '../../store/Os';

type State = {
  data: Array<OsData>;
  loading: boolean;
};

export default class OsHome extends React.Component {
  state: State = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    Os.getAll().then(data => {
      this.setState({data, loading: false});
    });
  }

  getList() {
    return this.state.data.map((os, i) => ({
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
      <ListPage
        title="Operating Systems"
        links={this.getList()}
        loading={this.state.loading} />
      );
  }
}
