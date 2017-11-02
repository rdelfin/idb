// @flow
import React from 'react';
import throttle from 'throttle-debounce/throttle';
import TableCard from '../TableCard';
import type {TableSpec} from '../TableCard/TableCard';
import './tablePage.css';

type Props = {
  title: string,
  image: string,
  tables: Array<TableSpec>,
};

type State = {
  columns: Array<Array<TableSpec>>,
  clientWidth: number,
  numColumns: number,
  nextTableIndex: number,
};

const CARD_WIDTH = 532;

export default class TablePage extends React.PureComponent {
  props: Props;
  state: State = {
    columns: [],
    clientWidth: 0,
    numColumns: 0,
    nextTableIndex: 0,
  };
  rootRef: HTMLElement;
  columnRefs: Array<HTMLElement> = [];
  throttledLoadColumns: () => void;
  throttledLoadTable: () => void;

  constructor(props: Props) {
    super(props);
    this.throttledLoadColumns = throttle(100, this.loadColumns);
    this.throttledLoadTable = throttle(50, this.loadTable);
  }

  componentDidMount() {
    window.addEventListener('resize', this.throttledLoadColumns);
    this.loadColumns();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledLoadColumns);
  }

  loadColumns = () => {
    const clientWidth = this.rootRef.clientWidth;
    const numColumns = Math.max(1, Math.floor(clientWidth / CARD_WIDTH));
    if (numColumns === this.state.numColumns)
      return;
    const columns = (Array: any).apply(null, {length: numColumns}).map(() => []);
    this.setState({
      columns,
      clientWidth,
      numColumns,
      nextTableIndex: 0,
    });
  };

  componentDidUpdate() {
    this.throttledLoadTable();
  }

  loadTable = () => {
    if (this.state.nextTableIndex >= this.props.tables.length)
      return;
    let nextColumn = 0;
    let nextColumnHeight = this.columnRefs[0].clientHeight;
    let nextColumnIndex = 0;
    for (let i = 1; i < this.state.numColumns; i++) {
      const columnHeight = this.columnRefs[i].clientHeight;
      if (columnHeight < nextColumnHeight) {
        nextColumn = this.columnRefs[i];
        nextColumnHeight = columnHeight;
        nextColumnIndex = i;
      }
    }
    const newColumns = this.state.columns.map(col => col.slice(0));
    newColumns[nextColumnIndex].push(this.props.tables[this.state.nextTableIndex]);
    this.setState({
      columns: newColumns,
      nextTableIndex: this.state.nextTableIndex + 1,
    });
  }

  render() {
    return (
      <div styleName="root" ref={r => this.rootRef = r}>
        <h1 styleName="header">{this.props.title}</h1>
        <div styleName="cardContainer">
          {this.state.columns.map((column, i) => (
            <div styleName="column" key={i} ref={r => this.columnRefs[i] = r}>
              {column.map((table, j) => <TableCard table={table} key={j} />)}
            </div>
          ), this)}
        </div>
      </div>
    );
  }
}
