// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu';
import './navbar.css';

type State = {
  menuShown: boolean,
  windowSize: number,
};

export default class Navbar extends Component {
  state: State;

  constructor() {
    super();
    this.state = {
      menuShown: false,
      windowSize: getBodyWidth(),
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
      windowSize: getBodyWidth(),
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
          <Link key="1" to="/phones" styleName="link">Phones</Link>,
          <Link key="2" to="/manufacturers" styleName="link">Manufacturers</Link>,
          <Link key="3" to="/carriers" styleName="link">Carriers</Link>,
          <Link key="4" to="/os" styleName="link">Operating Systems</Link>,
          <Link key="5" to="/about" styleName="link">About</Link>,
        ]}
        {this.state.windowSize < 800 && [
          <i key="6" styleName="hamburger" className="fa fa-bars" onClick={this.showMenu} />,
          <HamburgerMenu key="7" shown={this.state.menuShown} hide={this.hideMenu} />,
        ]}
      </div>
    );
  }
}

function getBodyWidth() {
  if (document.body)
    return document.body.clientWidth;
  else
    return 0;
}
