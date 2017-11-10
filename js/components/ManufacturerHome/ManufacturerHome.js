// @flow
import _ from 'lodash';
import React from 'react';
import ListPage from '../ListPage';
import Manufacturers, {sortKeys, getLinkSpecs} from '../../store/Manufacturers';
import type {Manufacturer} from '../../store/Manufacturers';

type State = {
  data: Array<Manufacturer>;
  loading: boolean;
};

export default class ManufacturerHome extends React.PureComponent {
  state: State = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    Manufacturers.getAll().then(data => {
      this.setState({data, loading: false});
    });
  }

  getList() {
    return getLinkSpecs(this.state.data);
  }

  render() {
    return (
      <ListPage
        title="Manufacturers"
        links={this.getList()}
        loading={this.state.loading}
        sortKeys={sortKeys} />
      );
  }
}
