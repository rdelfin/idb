// @flow
import _ from 'lodash';
import React from 'react';
import ListPage from '../ListPage';
import Spniner from '../Spinner';
import PhoneModels, {sortKeys, getLinkSpecs} from '../../store/PhoneModels';
import type {PhoneModel} from '../../store/PhoneModels';
import type {LinkSpec} from '../ListPage/ListPage';

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

  getList(): Array<LinkSpec> {
    return getLinkSpecs(this.state.data);
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
