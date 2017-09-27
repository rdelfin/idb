// @flow
import React, {PureComponent} from 'react';
import {getById} from '../../store/PhoneModels';
import type {Match} from '../../types';
import './phoneModelPage.css';

type Props = {
  match: Match,
};

export default class PhoneModelPage extends PureComponent<void, Props, void> {
  render() {
    const {model} = this.props.match.params;
    const modelData = getById(model);
    if (!modelData)
      return <div />;
    return (
      <div styleName="root">
        <h1 styleName="header">{modelData.name}</h1>
        <div styleName="cardContainer">
          <div styleName="cardWrapper">
            <div styleName="card">
              <h3 styleName="sectionHeader">
                <i styleName="sectionIcon" className="fa fa-star" />
                General
              </h3>
              <table styleName="table">
                <tr>
                  <td>Release Date</td>
                  <td>{modelData.release_date}</td>
                </tr>
                <tr>
                  <td>Announce Date</td>
                  <td>{modelData.announce_date}</td>
                </tr>
                <tr>
                  <td>Codename</td>
                  <td>{modelData.codename}</td>
                </tr>
                <tr>
                  <td>Designer</td>
                  <td>{modelData.hardware_designer}</td>
                </tr>
              </table>
            </div>
          </div>
          <div styleName="cardWrapper">
            <div styleName="card">
              <h3 styleName="sectionHeader">
                <i styleName="sectionIcon" className="fa fa-arrows" />
                Physical Attributes
              </h3>
              <table styleName="table">
                <tr>
                  <td>Dimensions</td>
                  <td>{modelData.physical_attributes.dimensions}</td>
                </tr>
                <tr>
                  <td>Mass</td>
                  <td>{modelData.physical_attributes.mass}</td>
                </tr>
              </table>
            </div>
          </div>
          <div styleName="cardWrapper">
            <div styleName="card">
              <h3 styleName="sectionHeader">
                <i styleName="sectionIcon" className="fa fa-microchip" />
                Hardware
              </h3>
              <table styleName="table">
                <tr>
                  <td>CPU</td>
                  <td>
                    {modelData.hardware.cpu.model}
                    <br />
                    {modelData.hardware.cpu.clock_speed}
                  </td>
                </tr>
                <tr>
                  <td>GPU</td>
                  <td>
                    {modelData.hardware.gpu.model}
                    <br />
                    {modelData.hardware.gpu.clock_speed}
                  </td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>
                    {modelData.hardware.ram.type}
                    <br />
                    {modelData.hardware.ram.capacity}
                  </td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>
                    {modelData.hardware.nonvolatile_memory.type}
                    <br />
                    {modelData.hardware.nonvolatile_memory.capacity}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div styleName="cardWrapper">
            <div styleName="card">
              <h3 styleName="sectionHeader">
                <i styleName="sectionIcon" className="fa fa-desktop" />
                Display
              </h3>
              <table styleName="table">
                <tr>
                  <td>Size</td>
                  <td>{modelData.display.width} x {modelData.display.height}<br />({modelData.display.diagonal} diagonal)</td>
                </tr>
                <tr>
                  <td>Resolution</td>
                  <td>{modelData.display.resolution} @ {modelData.display.pixel_density}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>{modelData.display.type}</td>
                </tr>
                <tr>
                  <td>Color Depth</td>
                  <td>{modelData.display.color_depth}</td>
                </tr>
                <tr>
                  <td>Bezel</td>
                  <td>{modelData.display.bezel_width} ({modelData.display.area_utilization} utilization)</td>
                </tr>
                <tr>
                  <td>Glass</td>
                  <td>{modelData.display.screen}</td>
                </tr>
              </table>
            </div>
          </div>
          {modelData.cameras.map((camera, i) => (
            <div key={i} styleName="cardWrapper">
              <div styleName="card">
                <h3 styleName="sectionHeader">
                  <i styleName="sectionIcon" className="fa fa-camera" />
                  Camera {i + 1}
                </h3>
                <table styleName="table">
                  <tr>
                    <td>Placement</td>
                    <td>{camera.placement}</td>
                  </tr>
                  <tr>
                    <td>Sensor</td>
                    <td>{camera.sensor} {camera.sensor_format || ''}</td>
                  </tr>
                  <tr>
                    <td>Resolution</td>
                    <td>
                      Still: {camera.resolution} ({camera.num_pixels})
                      <br />
                      Video: {camera.camcorder.resolution}
                    </td>
                  </tr>
                  <tr>
                    <td>Aperture</td>
                    <td>{camera.aperture}</td>
                  </tr>
                  <tr>
                    <td>Optical Zoom</td>
                    <td>{camera.optical_zoom}</td>
                  </tr>
                  {camera.digital_zoom &&
                    <tr>
                      <td>Digital Zoom</td>
                      <td>{camera.digital_zoom}</td>
                    </tr>}
                  {camera.flash &&
                    <tr>
                      <td>Flash</td>
                      <td>{camera.flash}</td>
                    </tr>}
                  {camera.focus &&
                    <tr>
                      <td>Focus</td>
                      <td>{camera.focus.map(focus => <span>{focus}<br /></span>)}</td>
                    </tr>}
                  <tr>
                    <td>Formats</td>
                    <td>Still: {camera.formats}<br />Video: {camera.camcorder.formats}</td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
      );
  }
}
