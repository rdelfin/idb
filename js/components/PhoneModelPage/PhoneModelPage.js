// @flow
import React, {PureComponent} from 'react';
import {getById} from '../../store/PhoneModels';
import type {Match} from '../../types';

type Props = {
  match: Match,
};

export default class PhoneModelPage extends PureComponent<void, Props, void> {
  render() {
    const {model} = this.props.match.params;
    const modelData = getById(model);
    return (
      <div>PhoneModel: {JSON.stringify(modelData)}</div>
      );
  }
}
