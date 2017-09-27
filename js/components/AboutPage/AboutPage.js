// @flow
import React, {PureComponent} from 'react';
import TeamMemberCard from '../TeamMemberCard';
import './aboutPage.css';

export default class AboutPage extends PureComponent {
  render() {
    return (
      <div styleName="teamCards">
        <TeamMemberCard name="Brian Cui" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
        <TeamMemberCard name="Jonathan Fisher" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
        <TeamMemberCard name="Matt Gmitro" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
        <TeamMemberCard name="Ricardo Delfin" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
        <TeamMemberCard name="Trey Gonsoulin" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
        <TeamMemberCard name="Xuming Zeng" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
      </div>
    );
  }
}
