// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {getIdByName as getCarrierId} from '../../store/Carriers';
import {getById} from '../../store/Manufacturers';
import {getIdByName as getPhoneId} from '../../store/PhoneModels';
import {getIdByName as getOsId} from '../../store/Os';
import TablePage from '../TablePage';
import {joinLines, joinLinkLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {Manufacturer} from '../../store/Manufacturers';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

export default class ManufacturerPage extends PureComponent<void, Props, void> {
  getTables(mf: Manufacturer): Array<TableSpec> {
    return [
      {
        title: 'Logo',
        icon: 'address-card',
        image: mf.image,
      },
      {
        title: 'General',
        icon: 'star',
        rows: [
          {
            title: 'Location',
            shown: mf.location,
            value: () => mf.location,
          },
          {
            title: 'Founded',
            shown: mf.found_date,
            value: () => mf.found_date,
          },
          {
            title: 'Founders',
            shown: mf.founders,
            value: () => joinLines(mf.founders || []),
          },
          {
            title: 'Industries',
            shown: mf.industries,
            value: () => joinLines(mf.industries || []),
          },
          {
            title: 'Parent',
            shown: mf.parent,
            value: () => mf.parent,
          },
        ],
      },
      {
        title: 'Links',
        icon: 'link',
        rows: [
          {
            title: 'Phone Models',
            shown: mf.phone_models && mf.phone_models.length,
            value: () => joinLinkLines(mf.phone_models, 'phones', getPhoneId),
          },
          {
            title: 'Carriers',
            shown: mf.carriers && mf.carriers.length,
            value: () => joinLinkLines(mf.carriers, 'carriers', getCarrierId),
          },
          {
            title: 'OSs',
            shown: mf.os && mf.os.length,
            value: () => joinLinkLines(mf.os, 'os', getOsId),
          },
        ],
      },
    ];
  }

  render() {
    const {manufacturer} = this.props.match.params;
    const manufacturerData = getById(manufacturer);
    if (!manufacturerData)
      return <div />
    return (
      <TablePage title={manufacturerData.name} image={manufacturerData.image} tables={this.getTables(manufacturerData)} />
    );
  }
}
