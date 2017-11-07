// @flow
import React from 'react';
import throttle from 'throttle-debounce/throttle';
import {Link} from 'react-router-dom';
import FilterSort from '../../FilterSort';
import ListPageList from '../ListPageList';
import type {ReactChildren} from '../../types';
import './listPage.css';

type Props = {
  title: ReactChildren<*>,
  links: Array<LinkSpec>,
  loading: boolean,
};

type State = {
  filterSort: FilterSort<*>,
  searchQuery: string,
  page: number,
  numPages: number,
};

export type LinkSpec = {
  url: string,
  title: string,
  stats: Array<string>,
  spec: {image: string},
};

export default class ListPage extends React.PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    const filterSort = new FilterSort(props.links);
    this.state = {
      searchQuery: '',
      filterSort: filterSort,
      page: 0,
      numPages: filterSort.getNumPages(),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.links !== nextProps.links) {
      const numPages = this.state.filterSort.setFilterParams({source: nextProps.links});
      this.setState({numPages});
    }
  }

  handleSearchInput = (event: SyntheticEvent) => {
    const val = ((event.target: any): HTMLInputElement).value;
    this.setState({searchQuery: val, page: 0});
    const numPages = this.state.filterSort.setFilterParams({search: val});
    this.setState({numPages});
  };

  handlePrevPageClick = () => {
    if (this.state.page > 0) {
      this.setState({page: this.state.page - 1});
    }
  };

  handleNextPageClick = () => {
    if (this.state.page + 1 < this.state.numPages) {
      this.setState({page: this.state.page + 1});
    }
  };

  handleJumpToPageClick = (page: number) => () => {
    this.setState({page});
  };

  render() {
    return (
      <div styleName="root">
        <h1 styleName="title">{this.props.title}</h1>
        <div styleName="filters">
          <input
            styleName="search"
            type="text"
            placeholder="Search"
            onChange={this.handleSearchInput}
            value={this.state.searchQuery} />
        </div>
        <div styleName="pagination">
          <button onClick={this.handlePrevPageClick}>Prev</button>
          {(Array: any).apply(null, {length: this.state.numPages}).map((_, i) =>
            <button
              key={i}
              onClick={this.handleJumpToPageClick(i)}
              styleName={i === this.state.page ? 'selected' : ''}>
              {i + 1}
            </button>
          )}
          <button onClick={this.handleNextPageClick}>Next</button>
        </div>
        <ListPageList
          links={this.state.filterSort.getPage(this.state.page)}
          loading={this.props.loading} />
      </div>
    );
  }
}
