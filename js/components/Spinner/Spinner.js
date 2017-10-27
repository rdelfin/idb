// @flow
import React from 'react';
import './spinner.css';

type Props = {
  marginTop?: boolean,
};

const Spinner = ({marginTop}: Props) =>
  <i styleName={marginTop ? "spinner tall" : "spinner"} className="fa fa-spinner" />;
export default Spinner;
