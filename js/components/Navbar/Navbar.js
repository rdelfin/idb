// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

type Props = {
};

const Navbar = (props: Props) => {
  return (
    <div styleName="navbar">
      <Link to="/" styleName="title">
        <i className="fa fa-mobile" />
        PhoneDB
      </Link>
      <div styleName="spacer" />
      <Link to="/phones" styleName="link">Phones</Link>
      <Link to="/manufacturers" styleName="link">Manufacturers</Link>
      <Link to="/carriers" styleName="link">Carriers</Link>
      <Link to="/os" styleName="link">Operating Systems</Link>
      <Link to="/about" styleName="link">About</Link>
    </div>
  );
}

export default Navbar;
