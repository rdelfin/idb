// @flow
import React from 'react';
import ListPage from '../ListPage';
import Carriers, {getLinkSpecs as getCarrierLinkSpecs} from '../../store/Carriers';
import Manufacturers, {getLinkSpecs as getManufacturerLinkSpecs} from '../../store/Manufacturers';
import Os, {getLinkSpecs as getOsLinkSpecs} from '../../store/Os';
import PhoneModels, {getLinkSpecs as getPhoneLinkSpecs} from '../../store/PhoneModels';
import type {LinkSpec} from '../ListPage/ListPage';
import type {Carrier} from '../../store/Carriers';
import type {Manufacturer} from '../../store/Manufacturers';
import type {Os as OsType} from '../../store/Os';
import type {PhoneModel} from '../../store/PhoneModels';
import type {KeyDef} from '../../store/util';

type State = {
  carriers: Array<Carrier>,
  manufacturers: Array<Manufacturer>,
  os: Array<OsType>,
  models: Array<PhoneModel>,
  loading: boolean,
};

const sortKeys: Array<KeyDef> = [
  {
    path: 'name',
    displayName: 'Name',
  },
];

export default class SearchPage extends React.PureComponent {
  state: State = {
    carriers: [],
    manufacturers: [],
    os: [],
    models: [],
    loading: true,
  };

  componentDidMount() {
    Promise.all([
      Carriers.getAll(),
      Manufacturers.getAll(),
      Os.getAll(),
      PhoneModels.getAll(),
    ]).then(([carriers, manufacturers, os, models]) => {
      this.setState({
        carriers,
        manufacturers,
        os,
        models,
        loading: false,
      });
    });
  }

  getList(): Array<LinkSpec> {
    return getCarrierLinkSpecs(this.state.carriers).concat(
      getManufacturerLinkSpecs(this.state.manufacturers),
      getOsLinkSpecs(this.state.os),
      getPhoneLinkSpecs(this.state.models),
    );
  }

  render() {
    return (
      <ListPage
        title="Search"
        links={this.getList()}
        loading={this.state.loading}
        sortKeys={sortKeys} />
    );
  }
}
