// @flow
import React from 'react';
import throttle from 'throttle-debounce/throttle';
import {Link} from 'react-router-dom';
import type {ReactChildren} from '../../types';
import './listPage.css';

type Props = {
  title: ReactChildren<*>,
  links: Array<LinkSpec>,
};

type State = {
  nextIndex: number,
  renderedLinks: Array<LinkSpec>,
};

export type LinkSpec = {
  url: string,
  title: ReactChildren<*>,
  stats: Array<ReactChildren<*>>,
};

class AnimatedLink extends React.PureComponent {
  props: LinkSpec;
  state: {rendered: boolean} = {
    rendered: false,
  };

  componentDidMount() {
    setTimeout((() => {
      this.setState({
        rendered: true,
      });
    }), 100);
  }

  render() {
    return (
      <Link key={this.props.url}
            to={this.props.url}
            styleName={this.state.rendered ? "item shown" : "item"}>
        <div styleName="name">{this.props.title}</div>
        <div styleName="stats">
          {this.props.stats.map((stat, i) => <div key={i}>{stat}</div>)}
        </div>
      </Link>
    );
  }
}

export default class ListPage extends React.PureComponent {
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

  componentWillUpdate(nextProps: Props) {
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
      <div styleName="root">
        <h1 styleName="title">{this.props.title}</h1>
        {this.state.renderedLinks.map(({url, title, stats}) => (
          <AnimatedLink key={url} url={url} title={title} stats={stats} />
        ))}
      </div>
    );
  }
}
