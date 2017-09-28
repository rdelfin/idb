// @flow
import React, {PureComponent} from 'react';
import {getById} from '../../store/PhoneModels';
import TablePage from '../TablePage';
import {joinLines} from '../../util';
import type {TableSpec} from '../TableCard/TableCard';
import type {PhoneModel} from '../../store/PhoneModels';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

export default class PhoneModelPage extends PureComponent<void, Props, void> {
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
            title: 'Designer',
            shown: model.hardware_designer,
            value: () => model.hardware_designer,
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
                {model.hardware.cpu.model}
                <br />
                {model.hardware.cpu.clock_speed}
              </span>,
          },
          {
            title: 'GPU',
            shown: model.hardware.gpu,
            value: () =>
              <span>
                {(model.hardware.gpu: any).model}
                <br />
                {(model.hardware.gpu: any).clock_speed}
              </span>,
          },
          {
            title: 'RAM',
            shown: model.hardware.ram,
            value: () =>
              <span>
                {model.hardware.ram.type}
                <br />
                {model.hardware.ram.capacity}
              </span>,
          },
          {
            title: 'Storage',
            shown: model.hardware.nonvolatile_memory,
            value: () =>
              <span>
                {model.hardware.nonvolatile_memory.type}
                <br />
                {model.hardware.nonvolatile_memory.capacity}
              </span>,
          },
        ],
      },
      {
        title: 'Display',
        icon: 'desktop',
        rows: [
          {
            title: 'Size',
            shown: model.display.diagonal,
            value: () => {
              if (model.display.width && model.display.height)
                return `${model.display.diagonal} (${model.display.width} x ${model.display.height})`;
              else
                return model.display.diagonal;
            },
          },
          {
            title: 'Resolution',
            shown: model.display.resolution,
            value: () => {
              if (model.display.pixel_density)
                return `${model.display.resolution} @ ${model.display.pixel_density}`;
              else
                return model.display.resolution;
            },
          },
          {
            title: 'Type',
            shown: model.display.type,
            value: () => model.display.type,
          },
          {
            title: 'Color Depth',
            shown: model.display.color_depth,
            value: () => model.display.color_depth,
          },
          {
            title: 'Bezel',
            shown: model.display.bezel_width,
            value: () => {
              if (model.display.area_utilization)
                return `${model.display.bezel_width} (${model.display.area_utilization} utilization)`;
              else
                return model.display.bezel_width;
            },
          },
          {
            title: 'Glass',
            shown: model.display.screen,
            value: () => model.display.screen,
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
    })));
  }

  render() {
    const {model} = this.props.match.params;
    const modelData = getById(model);
    if (!modelData)
      return <div />;
    return (
      <TablePage title={modelData.name} tables={this.getTables(modelData)} />
    );
  }
}
