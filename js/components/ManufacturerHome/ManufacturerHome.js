// @flow
import _ from 'lodash';
import React from 'react';
import ListPage from '../ListPage';
import Manufacturers, {sortKeys} from '../../store/Manufacturers';
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
    return this.state.data.map((manufacturer, i) => ({
      url: `/manufacturers/${i}`,
      title: manufacturer.name,
      stats: _.at(manufacturer, [
        'type',
        'found_date',
        'location',
        'area_served',
      ]),
      spec: manufacturer,
    }));
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
