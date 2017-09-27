// @flow
import React from 'react';
import {ReactChildren} from '../../types';
import './tableCard.css';

type Props = {
  table: TableSpec,
};

export type TableSpec = {
  title: ReactChildren<*>,
  icon: string,
  rows: Array<TableRowSpec>,
};

type TableRowSpec = {
  shown: boolean,
  title: ReactChildren<*>,
  value: () => ReactChildren<*>,
};

const TableCard = (props: Props): React$Element<*> => (
  <div styleName="cardWrapper">
    <div styleName="card">
      <h3 styleName="sectionHeader">
        <i styleName="sectionIcon" className={`fa fa-${props.table.icon}`} />
        {props.table.title}
      </h3>
      <table styleName="table">
        <tbody>
          {props.table.rows.map(row => !!row.shown && (
            <tr>
              <td>{row.title}</td>
              <td>{row.value()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableCard;
