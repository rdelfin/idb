// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import throttle from 'throttle-debounce/throttle';
import Spinner from '../Spinner';
import type {FuseResult} from '../../types';
import type {LinkSpec} from '../ListPage/ListPage';
import './listPageList.css';

type Props = {
  links: Array<FuseResult<LinkSpec>>,
  loading: boolean,
};

type State = {
  nextIndex: number,
  renderedLinks: Array<FuseResult<LinkSpec>>,
};

class AnimatedLink extends React.PureComponent {
  props: {link: FuseResult<LinkSpec>};
  state: {rendered: boolean} = {
    rendered: false,
  };
  timeout: number;

  componentDidMount() {
    this.timeout = setTimeout((() => {
      this.setState({
        rendered: true,
      });
    }), 100);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <Link key={this.props.link.item.url}
            to={this.props.link.item.url}
            styleName={this.state.rendered ? "item shown" : "item"}>
        <div styleName="name">{this.props.link.item.title}</div>
        {this.props.link.item.spec.image && this.props.link.item.spec.image.length && <img styleName="image" src={this.props.link.item.spec.image} />}
        <ul styleName="stats">
          {this.props.link.item.stats.filter(stat => stat && stat.trim().length).map((stat, i) => <li key={i}>{stat}</li>)}
        </ul>
      </Link>
    );
  }
}

export default class ListPageList extends React.PureComponent {
  props: Props;
  state: State = {
    nextIndex: 0,
    renderedLinks: [],
  };
  throttledLoadLink: () => void;

  constructor(props: Props) {
    super(props);
    this.throttledLoadLink = throttle(50, this.loadLink);
  }

  componentDidMount() {
    this.throttledLoadLink();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.links !== nextProps.links) {
      this.setState({
        nextIndex: 0,
        renderedLinks: [],
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    this.throttledLoadLink();
  }

  loadLink = () => {
    if (this.state.nextIndex >= this.props.links.length) {
      return;
    }

    const renderedLinks = this.state.renderedLinks.slice(0);
    renderedLinks.push(this.props.links[this.state.nextIndex]);
    this.setState({
      renderedLinks,
      nextIndex: this.state.nextIndex + 1,
    });
  };

  render() {
    return (
      <div>
        {this.props.loading && <Spinner />}
        <div styleName="root">
        {this.state.renderedLinks.map(link => (
          <AnimatedLink key={link.item.url} link={link} />
        ))}
        </div>
      </div>
    );
  }
}
