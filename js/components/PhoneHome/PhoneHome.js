// @flow
import React from 'react';
import ListPage from '../ListPage';
import Spniner from '../Spinner';
import PhoneModels, {sortKeys} from '../../store/PhoneModels';
import type {PhoneModel} from '../../store/PhoneModels';

type State = {
  data: Array<PhoneModel>,
  loading: boolean,
};

export default class PhoneHome extends React.Component {
  state: State = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    PhoneModels.getAll().then(data => {
      this.setState({data, loading: false});
    });
  }

  getList() {
    return this.state.data.map((model, i) => ({
      url: `/phones/${i}`,
      title: model.name,
      stats: [
        model.release_date,
        model.physical_attributes.dimensions,
        model.physical_attributes.mass,
        model.hardware.cpu.model,
        model.display.resolution,
      ],
      spec: model,
    }));
  }

  render() {
    return (
      <ListPage
        title="Phones"
        links={this.getList()}
        loading={this.state.loading}
        sortKeys={sortKeys} />
      );
  }
}
