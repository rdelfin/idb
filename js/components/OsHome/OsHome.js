// @flow
import React from 'react';
import ListPage from '../ListPage';
import Os, {sortKeys, getLinkSpecs} from '../../store/Os';
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
    return getLinkSpecs(this.state.data);
  }

  render() {
    return (
      <ListPage
        title="Operating Systems"
        links={this.getList()}
        loading={this.state.loading}
        sortKeys={sortKeys} />
      );
  }
}
