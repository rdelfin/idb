// @flow
import React from 'react';
import {Route} from 'react-router-dom';

import AboutPage from '../AboutPage';
import CarrierHome from '../CarrierHome';
import CarrierPage from '../CarrierPage';
import HomePage from '../HomePage';
import ManufacturerHome from '../ManufacturerHome';
import ManufacturerPage from '../ManufacturerPage';
import Navbar from '../Navbar';
import OsHome from '../OsHome';
import OsPage from '../OsPage';
import PhoneHome from '../PhoneHome';
import PhoneModelPage from '../PhoneModelPage';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/carriers" component={CarrierHome} />
        <Route exact path="/manufacturers" component={ManufacturerHome} />
        <Route exact path="/os" component={OsHome} />
        <Route exact path="/phones" component={PhoneHome} />
        <Route path="/phones/:model" component={PhoneModelPage} />
        <Route path="/manufacturers/:manufacturer" component={ManufacturerPage} />
        <Route path="/carriers/:carrier" component={CarrierPage} />
        <Route path="/os/:os" component={OsPage} />
      </div>
    );
  }
}
