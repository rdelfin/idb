// @flow
import React, {PureComponent} from 'react';
import TeamMemberCard from '../TeamMemberCard';
import './aboutPage.css';

export default class AboutPage extends PureComponent {
  render() {
    return (
      <div styleName="root">
        <h1 styleName="title">About Us</h1>
        <p styleName="description">We are a team of UT students who are passionate about getting an A in SWE and graduating on time.</p>
        <div styleName="teamCards">
          <TeamMemberCard name="Brian Cui" avatarUrl="/static/images/brian.png" blurb="Born and raised in Austin. Working on a Master's degree. I fight for the user. I mean, I write user stories. I also write code." />
          <TeamMemberCard name="Jonathan Fisher" avatarUrl="/static/images/jonathan.png" blurb="I am the best developer ever" />
          <TeamMemberCard name="Matt Gmitro" avatarUrl="http://placehold.it/200x200" blurb="I am the best developer ever" />
          <TeamMemberCard name="Ricardo Delfin" avatarUrl="/static/images/rdelfin.png" blurb="Tapatio who grew up in Mexico City! Interested in graphics, C++, systems, and anything that involves as little node.js as possible." />
          <TeamMemberCard name="Trey Gonsoulin" avatarUrl="/static/images/trey.png" blurb="21+ years in Austin. I'm still skeptical, but the others assure me this 'internet' thing will really take off, so I'm along for the ride." />
          <TeamMemberCard name="Xuming Zeng" avatarUrl="/static/images/xsznix.jpg" blurb="Born in PRC, raised in AB, FL, CO, and TX. I didn't expect to learn anything from this, but now I know that I hate Webpack." />
        </div>
      </div>
    );
  }
}
