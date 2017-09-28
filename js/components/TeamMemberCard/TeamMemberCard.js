// @flow
import React from 'react';
import './teamMemberCard.css';
type Props = {
  name: string,
  avatarUrl: string,
  blurb: string,
  tasks: string,
  commits: number,
  issues: number,
  tests: number,
};

const TeamMemberCard = (props: Props): React$Element<*> => (
  <div styleName="root">
    <div styleName="front">
      <img styleName="avatar" src={props.avatarUrl} />
      <div styleName="name">{props.name}</div>
      <div styleName="blurb">{props.blurb}</div>
    </div>
    <div styleName="back">
      <h4 styleName="header">My responsibilities</h4>
      <div>{props.tasks}</div>
      <div styleName="stats">
        <div>Commits: {props.commits}</div>
        <div>Issues: {props.issues}</div>
        <div>Unit tests: {props.tests}</div>
      </div>
    </div>
  </div>
);

export default TeamMemberCard;
