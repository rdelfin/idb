// @flow
import React from 'react';
import './teamMemberCard.css';
type Props = {
  name: string,
  avatarUrl: string,
  blurb: string,
};

const TeamMemberCard = (props: Props): React$Element<*> => (
  <div styleName="root">
    <img styleName="avatar" src={props.avatarUrl} />
    <div styleName="name">{props.name}</div>
    <div styleName="blurb">{props.blurb}</div>
  </div>
);

export default TeamMemberCard;
