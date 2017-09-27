// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu';
import './navbar.css';

type State = {
  menuShown: boolean,
  windowSize: number,
};

export default class Navbar extends Component<void, void, State> {
  constructor() {
    super();
    this.state = {
      menuShown: false,
      windowSize: document.body.clientWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({
      windowSize: document.body.clientWidth,
    });
  };

  showMenu = () => {
    this.setState({
      menuShown: true,
    });
  };

  hideMenu = () => {
    this.setState({
      menuShown: false,
    });
  };

  render() {
    return (
      <div styleName="navbar">
        <Link to="/" styleName="title">
          <i styleName="logo" className="fa fa-mobile" />
          PhoneDB
        </Link>
        <div styleName="spacer" />
        {this.state.windowSize >= 800 && [
          <Link to="/phones" styleName="link">Phones</Link>,
          <Link to="/manufacturers" styleName="link">Manufacturers</Link>,
          <Link to="/carriers" styleName="link">Carriers</Link>,
          <Link to="/os" styleName="link">Operating Systems</Link>,
          <Link to="/about" styleName="link">About</Link>,
        ]}
        {this.state.windowSize < 800 && [
          <i styleName="hamburger" className="fa fa-bars" onClick={this.showMenu} />,
          <HamburgerMenu shown={this.state.menuShown} hide={this.hideMenu} />,
        ]}
      </div>
    );
  }
}
