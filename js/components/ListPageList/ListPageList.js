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

class AnimatedLink extends React.PureComponent {
  props: {link: FuseResult<LinkSpec>, delay: number};
  state: {rendered: boolean} = {
    rendered: false,
  };
  timeout: number;

  componentDidMount() {
    this.timeout = setTimeout((() => {
      this.setState({
        rendered: true,
      });
    }), this.props.delay);
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
          <Highlighter ranges={getRangesForProp(this.props.link.matches, 'title')}>
            {this.props.link.item.title || ''}
          </Highlighter>
        </div>
        {this.props.link.item.spec.image && this.props.link.item.spec.image.length && <img styleName="image" src={this.props.link.item.spec.image} />}
        <ul styleName="stats">
          {this.props.link.item.stats.filter(stat => stat && /\w/.test(stat)).map((stat, i) => <li key={i}>{stat}</li>)}
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
