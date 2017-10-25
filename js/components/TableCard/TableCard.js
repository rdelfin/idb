// @flow
import React from 'react';
import type {ReactChildren} from '../../types';
import './tableCard.css';

type Props = {
  table: TableSpec,
};

type State = {
  rendered: boolean,
};

export type TableSpec = {
  title: ReactChildren<*>,
  icon: string,
  rows?: Array<TableRowSpec>,
  image?: string,
};

type TableRowSpec = {
  shown: any, // implicitly cast to boolean, only needs to be truthy/falsy
  title: ReactChildren<*>,
  value: () => any, // ignore errors based on undefined checks that Flow doesn't catch
};

export default class TableCard extends React.PureComponent {
  props: Props;
  state: State = {
    rendered: false,
  };

  componentDidMount() {
    setTimeout((() => {
      this.setState({
        rendered: true,
      });
    }).bind(this), 100);
  }

  render() {
    return (
      <div styleName="cardWrapper">
        <div styleName={this.state.rendered ? "card shown" : "card"}>
          <h3 styleName="sectionHeader">
            <i styleName="sectionIcon" className={`fa fa-${this.props.table.icon}`} />
            {this.props.table.title}
          </h3>
          {this.props.table.rows && <table styleName="table">
            <tbody>
              {this.props.table.rows.map((row, i) => !!row.shown && (
                <tr key={i}>
                  <td>{row.title}</td>
                  <td>{row.value()}</td>
                </tr>
              ))}
            </tbody>
          </table>}
          {this.props.table.image && <img styleName="image" src={this.props.table.image} />}
        </div>
      </div>
    );
  }
}
