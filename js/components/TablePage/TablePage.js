// @flow
import React from 'react';
import TableCard from '../TableCard';
import type {TableSpec} from '../TableCard/TableCard';
import './tablePage.css';

type Props = {
  title: string,
  tables: Array<TableSpec>,
};

const TablePage = (props: Props): React$Element<*> => (
  <div styleName="root">
    <h1 styleName="header">{props.title}</h1>
    <div styleName="cardContainer">
      {props.tables.map(table => <TableCard table={table} />)}
    </div>
  </div>
);

export default TablePage;
