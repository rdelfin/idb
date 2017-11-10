// @flow
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './hamburgerMenu.css';

type Props = {
  shown: boolean,
  hide: () => void,
};

export default class HamburgerMenu extends PureComponent<void, Props, void> {
  render() {
    return (
      <div styleName={this.props.shown ? 'wrapper shown' : 'menu'} onClick={this.props.hide}>
        <div styleName={this.props.shown ? 'menu shown' : 'menu'}>
          <Link to="/phones" styleName="item">Phones</Link>
          <Link to="/manufacturers" styleName="item">Manufacturers</Link>
          <Link to="/carriers" styleName="item">Carriers</Link>
          <Link to="/os" styleName="item">Operating Systems</Link>
          <Link to="/search" styleName="item">Search</Link>
          <Link to="/about" styleName="item">About</Link>
        </div>
      </div>
    );
  }
}
