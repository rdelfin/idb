// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './homePage.css';

export default class HomePage extends PureComponent {
  constructor() {
    super();
    let base_image_path = '/static/images/ex/';
    let images = ['ios_11_os.jpg', 
      'android_7.0_nougat_os.jpg', 
      'att_mobility_carrier.jpg',
      'apple_iphone8_plus_model.jpg',
      'lg_v30_model.jpg'];

    this.state = {
      carousel_images: images.map((image) => { return base_image_path + image }),
      carousel_index: 0
    };
  }
  
  carousel_left = () => {
    let new_index = this.state.carousel_index === 0 
      ? this.state.carousel_images.length - 1: this.state.carousel_index - 1;

    this.setState({
      carousel_index: new_index
    });
  }

  carousel_right = () => {
    let new_index = this.state.carousel_index === this.state.carousel_images.length - 1 
      ? 0 : this.state.carousel_index + 1;

    this.setState({
      carousel_index: new_index
    });
  }

  render() {
    return (
      <div styleName="root">
        <div styleName="title">Welcome to PhoneDB</div>
        <div styleName="subtitle">The most extensive database of phones in the world*</div>
        <div styleName="subsubtitle">* Terms and conditions apply</div>
        <div styleName="carousel">
          <div styleName="leftarrow" onClick={this.carousel_left}></div>
            <img styleName="carousel_ride" src={this.state.carousel_images[this.state.carousel_index]}>
            </img>
          <div styleName="rightarrow" onClick={this.carousel_right}></div>
        </div>
        <div styleName="browseTable">
          <Link to="/phones" styleName="browseLink">Browse models <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
          <Link to="/manufacturers" styleName="browseLink">Browse manufacturers <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
          <Link to="/carriers" styleName="browseLink">Browse carriers <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
          <Link to="/os" styleName="browseLink">Browse OSs <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
        </div>
      </div>
    );
  }
}
