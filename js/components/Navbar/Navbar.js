// @flow
import React from 'react';
import './navbar.css';

type Props = {
};

const Navbar = (props: Props) => {
  return (
    <div styleName="navbar">
      <div styleName="title">
        <i className="fa fa-mobile" />
        PhoneDB
      </div>
      <div styleName="spacer" />
      <div styleName="link">Phones</div>
      <div styleName="link">Manufacturers</div>
      <div styleName="link">Carriers</div>
      <div styleName="link">Operating Systems</div>
      <div styleName="link">About</div>
    </div>
  );
}

export default Navbar;
