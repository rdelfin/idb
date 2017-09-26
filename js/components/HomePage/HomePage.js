// @flow
import React, {PureComponent} from 'react';
import './homePage.css';

export default class HomePage extends PureComponent {
  render() {
    return (
      <div styleName="root">
        <div styleName="title">Welcome to PhoneDB</div>
        <div styleName="subtitle">The most extensive database of phones in the world*</div>
        <div styleName="subsubtitle">* Terms and conditions apply</div>
      </div>
    );
  }
}
