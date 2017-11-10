// @flow
import React from 'react';
import throttle from 'throttle-debounce/throttle';
import {Link} from 'react-router-dom';
import FilterSort from '../../FilterSort';
import ListPageList from '../ListPageList';
import {getPaginationDisplayRange} from '../../util';
import type {ReactChildren} from '../../types';
import type {KeyDef} from '../../store/util';
import './listPage.css';

type Props = {
  title: ReactChildren<*>,
  links: Array<LinkSpec>,
  loading: boolean,
  sortKeys: Array<KeyDef>,
};

type State = {
  filterSort: FilterSort,
  searchQuery: string,
  page: number,
  numPages: number,
  sortKey: string,
  sortDesc: boolean,
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
      sortKey: props.sortKeys[0].path,
      sortDesc: false,
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
      window.scrollTo(0, 0);
    }
  };

  handleNextPageClick = () => {
    if (this.state.page + 1 < this.state.numPages) {
      this.setState({page: this.state.page + 1});
      window.scrollTo(0, 0);
    }
  };

  handleFirstPageClick = () => {
    this.setState({page: 0});
    window.scrollTo(0, 0);
  };

  handleLastPageClick = () => {
    this.setState({page: this.state.numPages - 1});
    window.scrollTo(0, 0);
  };

  handleJumpToPageClick = (page: number) => () => {
    this.setState({page});
    window.scrollTo(0, 0);
  };

  handleSelectSortKey = (sortKey: string) => () => {
    this.state.filterSort.setFilterParams({sortKey});
    this.setState({sortKey, page: 0});
  };

  handleSortDesc = () => {
    this.state.filterSort.setFilterParams({sortDesc: true});
    this.setState({sortDesc: true, page: 0});
  };

  handleSortAsc = () => {
    this.state.filterSort.setFilterParams({sortDesc: false});
    this.setState({sortDesc: false, page: 0});
  };

  render() {
    const [pageLo, pageHi] = getPaginationDisplayRange(this.state.page, this.state.numPages);
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
          <div>
            <button onClick={this.handleFirstPageClick}>First</button>
            <button onClick={this.handlePrevPageClick}>Prev</button>
            {(Array: any).apply(null, {length: pageHi - pageLo + 1}).map((_, i) =>
              <button
                key={i}
                onClick={this.handleJumpToPageClick(pageLo + i)}
                styleName={pageLo + i === this.state.page ? 'selected' : ''}>
                {pageLo + i + 1}
              </button>
            )}
            <button onClick={this.handleNextPageClick}>Next</button>
            <button onClick={this.handleLastPageClick}>Last</button>
          </div>
          <div>
            <span>Sort By:</span>
            {this.props.sortKeys.map(({path, displayName}, i) =>
              <button
                key={i}
                styleName={path === this.state.sortKey ? 'selected' : ''}
                onClick={this.handleSelectSortKey(path)}>
                {displayName}
              </button>
            )}
            <span styleName="spacer">|</span>
            <button
              styleName={this.state.sortDesc ? '' : 'selected'}
              onClick={this.handleSortAsc}>
              Ascending
            </button>
            <button
              styleName={this.state.sortDesc ? 'selected' : ''}
              onClick={this.handleSortDesc}>
              Descending
            </button>
          </div>
        </div>
        <ListPageList
          links={this.state.filterSort.getPage(this.state.page)}
          loading={this.props.loading} />
        <div styleName="pagination">
          <button onClick={this.handleFirstPageClick}>First</button>
          <button onClick={this.handlePrevPageClick}>Prev</button>
            {(Array: any).apply(null, {length: pageHi - pageLo + 1}).map((_, i) =>
              <button
                key={i}
                onClick={this.handleJumpToPageClick(pageLo + i)}
                styleName={pageLo + i === this.state.page ? 'selected' : ''}>
                {pageLo + i + 1}
              </button>
            )}
          <button onClick={this.handleNextPageClick}>Next</button>
          <button onClick={this.handleLastPageClick}>Last</button>
        </div>
      </div>
    );
  }
}
