// @flow
import React, {PureComponent} from 'react';
import type {ReactChildren} from '../../types';
import './placeholderPage.css';

type Props = {
  children: ReactChildren<any>,
};

export default function PlaceholderPage(props: Props): React$Element<*> {
  return (
    <div styleName="page">
      <div styleName="pageInner">
        <div styleName="content">
          <div styleName="icon" className="fa fa-wrench" />
          <div styleName="text">{props.children}</div>
          <div styleName="subtitle">Unimplemented page!</div>
        </div>
      </div>
    </div>
  );
}
