// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './homePage.css';

const HomePage = () => (
  <div>
    <div styleName="bg" />
    <div styleName="root">
      <div styleName="title">Welcome to PhoneDB</div>
      <div styleName="subtitle">The most extensive database of phones in the world*</div>
      <div styleName="subsubtitle">* Terms and conditions apply</div>
      <div styleName="browseTable">
        <Link to="/phones" styleName="browseLink">Models <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
        <Link to="/manufacturers" styleName="browseLink">Manufacturers <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
        <Link to="/carriers" styleName="browseLink">Carriers <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
        <Link to="/os" styleName="browseLink">OSs <i styleName="browseCaret" className="fa fa-caret-right" /></Link>
      </div>
    </div>
  </div>
);

export default HomePage;
