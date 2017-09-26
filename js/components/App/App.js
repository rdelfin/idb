// @flow
import React from 'react';
import {Route} from 'react-router-dom';

import Navbar from '../Navbar';
import PhoneHome from '../PhoneHome';
import PhoneModelPage from '../PhoneModelPage';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/phones" component={PhoneHome} />
        <Route path="/phones/:model" component={PhoneModelPage} />
      </div>
    );
  }
}
