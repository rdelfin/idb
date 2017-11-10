// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import Carriers from '../../store/Carriers';
import Manufacturers from '../../store/Manufacturers';
import Os from '../../store/Os';
import PhoneModels from '../../store/PhoneModels';
import Spinner from '../Spinner';
import TablePage from '../TablePage';
import {joinLines, joinLinkLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {PhoneModel} from '../../store/PhoneModels';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

type State = {
  data: ?PhoneModel,
  loading: boolean,
};

export default class PhoneModelPage extends PureComponent {
  state: State = {
    data: null,
    loading: true,
  };

  componentDidMount() {
    Promise.all([
      PhoneModels.getById(this.props.match.params.model),
      Carriers.fetch(),
      Manufacturers.fetch(),
      Os.fetch(),
    ]).then(([data, ..._]) => {
      this.setState({data, loading: false});
    });
  }

  getTables(model: PhoneModel): Array<TableSpec> {
    return [
      {
        title: 'General',
        icon: 'star',
        rows: [
          {
            title: 'Released',
            shown: model.release_date,
            value: () => model.release_date,
          },
          {
            title: 'Announced',
            shown: model.announce_date,
            value: () => model.announce_date,
          },
          {
            title: 'Codename',
            shown: model.codename,
            value: () => model.codename,
          },
          {
            title: 'Brand',
            shown: model.brand,
            value: () => <Link to={`/manufacturers/${Manufacturers.getIdByNameSync(model.brand)}`}>{model.brand}</Link>,
          },
          {
            title: 'Carriers',
            shown: model.carriers,
            value: () => joinLinkLines((model.carriers: any), 'carriers', Carriers.getIdByNameSync),
          },
        ],
      },
      {
        title: 'Physical Attributes',
        icon: 'arrows',
        rows: [
          {
            title: 'Dimensions',
            shown: model.physical_attributes.dimensions,
            value: () => model.physical_attributes.dimensions,
          },
          {
            title: 'Mass',
            shown: model.physical_attributes.mass,
            value: () => model.physical_attributes.mass,
          },
        ],
      },
      {
        title: 'Hardware',
        icon: 'microchip',
        rows: [
          {
            title: 'CPU',
            shown: model.hardware.cpu,
            value: () =>
              <span>
                {joinLines([model.hardware.cpu.model, model.hardware.cpu.clock_speed])}
              </span>,
          },
          {
            title: 'GPU',
            shown: model.hardware.gpu,
            value: () =>
              <span>
                {joinLines([(model.hardware.gpu: any).model, (model.hardware.gpu: any).clock_speed])}
              </span>,
          },
          {
            title: 'RAM',
            shown: model.hardware.ram,
            value: () =>
              <span>
                {joinLines([model.hardware.ram.type, model.hardware.ram.capacity])}
              </span>,
          },
          {
            title: 'Storage',
            shown: model.hardware.nonvolatile_memory,
            value: () =>
              <span>
                {joinLines([model.hardware.nonvolatile_memory.type, model.hardware.nonvolatile_memory.capacity])}
              </span>,
          },
        ],
      },
      {
        title: 'Software',
        icon: 'rocket',
        rows: [
          {
            title: 'Platform',
            shown: model.software && model.software.os,
            value: () => model.software.os,
          },
          {
            title: 'OS',
            shown: model.software && model.software.platform,
            value: () => <Link to={`/os/${Os.getIdByNameSync(model.software.platform)}`}>{model.software.platform}</Link>,
          },
        ],
      },
      {
        title: 'Display',
        icon: 'desktop',
        rows: [
          {
            title: 'Resolution',
            shown: model.display.resolution,
            value: () => model.display.resolution,
          },
        ],
      }
    ].concat(model.cameras.map((camera, i) => ({
      title: `Camera ${i + 1}`,
      icon: 'camera',
      rows: [
        {
          title: 'Placement',
          shown: camera.placement,
          value: () => camera.placement,
        },
        {
          title: 'Sensor',
          shown: camera.sensor,
          value: () => `${camera.sensor} ${camera.sensor_format || ''}`,
        },
        {
          title: 'Resolution',
          shown: camera.resolution || camera.num_pixels,
          value: () => {
            if (camera.camcorder && camera.camcorder.resolution)
              return (
                <span>
                  Still: {camera.resolution} {camera.num_pixels}
                  <br />
                  Video: {camera.camcorder.resolution}
                </span>
              );
            else
              return `${camera.resolution || ''} ${camera.num_pixels || ''}`;
          },
        },
        {
          title: 'Aperture',
          shown: camera.aperture,
          value: () => camera.aperture,
        },
        {
          title: 'Optical Zoom',
          shown: camera.optical_zoom,
          value: () => camera.optical_zoom,
        },
        {
          title: 'Digital Zoom',
          shown: camera.digital_zoom,
          value: () => camera.digital_zoom,
        },
        {
          title: 'Flash',
          shown: camera.flash,
          value: () => camera.flash,
        },
        {
          title: 'Focus',
          shown: camera.focus,
          value: () => joinLines((camera.focus: any)),
        },
        {
          title: 'Formats',
          shown: camera.formats,
          value: () => {
            if (camera.camcorder && camera.camcorder.formats)
              return (
                <span>
                  Still: {camera.formats}
                  <br />
                  Video: {camera.camcorder.formats}
                </span>
              );
          },
        },
      ],
    }))).concat([
      {
        title: 'Picture',
        icon: 'address-card',
        image: model.image,
      },
    ]);
  }

  render() {
    const modelData = this.state.data;
    if (!modelData)
      return <Spinner marginTop={true} />;
    return (
      <TablePage title={modelData.name} image={modelData.image} tables={this.getTables(modelData)} />
    );
  }
}
