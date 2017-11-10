// @flow
import React from 'react';
import ListPage from '../ListPage';
import Carriers, {sortKeys, getLinkSpecs} from '../../store/Carriers';
import type {Carrier} from '../../store/Carriers';
import type {LinkSpec} from '../ListPage/ListPage';

type State = {
  data: Array<Carrier>,
  loading: boolean,
};

export default class CarrierHome extends React.Component {
  state: State = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    Carriers.getAll().then(data => {
      this.setState({data, loading: false});
    });
  }

  getList() {
    return getLinkSpecs(this.state.data);
  }

  render() {
    return (
      <ListPage
        title="Carriers"
        links={this.getList()}
        loading={this.state.loading}
        sortKeys={sortKeys} />
      );
  }
}
