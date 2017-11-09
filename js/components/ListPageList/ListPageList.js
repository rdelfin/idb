// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import throttle from 'throttle-debounce/throttle';
import Highlighter from '../Highlighter';
import Spinner from '../Spinner';
import {getRangesForProp} from '../../util';
import type {FuseResult} from '../../types';
import type {LinkSpec} from '../ListPage/ListPage';
import './listPageList.css';

type Props = {
  links: Array<FuseResult<LinkSpec>>,
  loading: boolean,
};

type AnimatedLinkProps = {
  link: FuseResult<LinkSpec>,
  delay: number,
};

class AnimatedLink extends React.PureComponent {
  props: AnimatedLinkProps;
  state: {rendered: boolean} = {
    rendered: false,
  };
  timeout: number;

  componentDidMount() {
    this.animateIn();
  }

  componentWillReceiveProps(nextProps: AnimatedLinkProps) {
    if (this.props.delay !== nextProps.delay) {
      this.setState({
        rendered: false,
      });
      this.animateIn(nextProps.delay);
    }
  }

  animateIn(delay = this.props.delay) {
    this.timeout = setTimeout((() => {
      this.setState({
        rendered: true,
      });
    }), delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <Link key={this.props.link.item.url}
            to={this.props.link.item.url}
            styleName={this.state.rendered ? "item shown" : "item"}>
        <div styleName="name">
          <Highlighter
            ranges={getRangesForProp(this.props.link.matches, 'title')}>
            {this.props.link.item.title || ''}
          </Highlighter>
        </div>
        {this.props.link.item.spec.image
          && this.props.link.item.spec.image.length &&
          <div styleName="image" style={{backgroundImage: `url(${this.props.link.item.spec.image})`}} /> ||
          <div styleName="image" style={{backgroundImage: 'url(http://placekitten.com/g/300/300)'}} />}
        <ul styleName="stats">
          {this.props.link.item.stats.map((stat, i) => (
            stat && /\w/.test(stat) &&
            <li key={i}>
              <Highlighter ranges={getRangesForProp(this.props.link.matches, 'stats', i)}>
                {stat}
              </Highlighter>
            </li>
          ))}
        </ul>
      </Link>
    );
  }
}

const ListPageList = (props: Props) => (
  <div>
    {props.loading && <Spinner />}
    <div styleName="root">
    {props.links.map((link, i) => (
      <AnimatedLink key={link.item.url} link={link} delay={i * 50} />
    ))}
    </div>
  </div>
);

export default ListPageList;
