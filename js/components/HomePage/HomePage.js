// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './homePage.css';

export default class HomePage extends PureComponent {
  render() {
    return (
      <div styleName="root">
        <div styleName="title">Welcome to PhoneDB</div>
        <div styleName="subtitle">The most extensive database of phones in the world*</div>
        <div styleName="subsubtitle">* Terms and conditions apply</div>
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
