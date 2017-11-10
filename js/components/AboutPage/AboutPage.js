// @flow
import React, {PureComponent} from 'react';
import TeamMemberCard from '../TeamMemberCard';
import './aboutPage.css';

export default class AboutPage extends PureComponent {
  render() {
    return (
      <div styleName="root">
        <h2 styleName="title">About The Site</h2>
        <p styleName="description">
          PhoneDB exists to empower consumers with the data they need to buy the right phone for
          their needs, developers to adapt their software for the devices used by their target
          audience, and manufacturers to gather information on their competitors' offerings and
          capabilities. Check out our <a href="https://utexas.box.com/s/7ew0i1gdr070totsro6m7bucagw8wmit" styleName="link">technical report</a> for
          more information. Check out our <a href="https://utexas.box.com/s/5ss2wwf6gnm625n1i1hmwalxqjjofzwq" styleName="link">UML Diagram</a> to see how our database is designed.
        </p>
        <p styleName="description">
          Our two data sources are <a href="http://gsmarena.com/" styleName="link">GSMArena</a> and <a href="http://pdadb.net" styleName="link">PDADB</a>, scraped using the <a href="https://www.crummy.com/software/BeautifulSoup/" styleName="link">BeautifulSoup</a> Python library. BeautifulSoup is used to traverse the HTML document tree and retrieve the relevant data, which is serialized and later deserialized using the <a href="https://docs.python.org/3/library/pickle.html" styleName="link">Pickle</a> Python module. Code for the scrapers are included in our <a href="https://github.com/rdelfin/idb" styleName="link">GitHub repository.</a>
        </p>
        <h2 styleName="title2">Our Team</h2>
        <p styleName="description">We are a team of UT students who are passionate about getting an A in SWE and graduating on time.</p>
        <div styleName="teamCards">
          <TeamMemberCard
            name="Brian Cui"
            avatarUrl="/static/images/brian.png"
            blurb="Born and raised in Austin. Working on a Master's degree. I fight for the user. I mean, I write user stories. I also write code."
            tasks="I led the team, created user stories, implemented the carousel, and wrote a large portion of the technical report."
            commits={32}
            issues={5}
            tests={1}
            />
          <TeamMemberCard
            name="Jonathan Fisher"
            avatarUrl="/static/images/jonathan.png"
            blurb="Born from the backwoods of Silsbee, TX. My family still thinks I'm doing an 'IT' job, but hey, I'm doing right by UT."
            tasks="I worked on a Python website scraper for retrieving data for our backend API to be used on our next projects. "
            commits={21}
            issues={5}
            tests={0}
            />
          <TeamMemberCard
            name="Matt Gmitro"
            avatarUrl="/static/images/MattGmitro.jpg"
            blurb="Born in Minneapolis, I migrated south and grew up in Flower Mound, TX. My focus is in preventing cryptocurrency bubbles from bursting."
            tasks="I added information about the upcoming API to the technical report."
            commits={16}
            issues={2}
            tests={6}
            />
          <TeamMemberCard
            name="Ricardo Delfin"
            avatarUrl="/static/images/rdelfin.png"
            blurb="Tapatio who grew up in Mexico City! Interested in graphics, C++, systems, and anything that involves as little node.js as possible."
            tasks="Managed deployments, GCP, domain, created repo and apiary and helped add the data to the site."
            commits={127}
            issues={7}
            tests={0}
            />
          <TeamMemberCard
            name="Trey Gonsoulin"
            avatarUrl="/static/images/trey.png"
            blurb="21+ years in Austin. I'm still skeptical, but the others assure me this 'internet' thing will really take off, so I'm along for the ride."
            tasks="I worked on API documentation and design, information scraping, and technical reporting."
            commits={55}
            issues={5}
            tests={0}
            />
          <TeamMemberCard
            name="Xuming Zeng"
            avatarUrl="/static/images/xsznix.jpg"
            blurb="Born in PRC, raised in AB, FL, CO, and TX. I didn't expect to learn anything from this, but now I know that I hate Webpack."
            tasks="I wrote the vast majority of the frontend for PhoneDB."
            commits={72}
            issues={8}
            tests={0}
            />
        </div>
        <h2 styleName="title2">Our Tools</h2>
        <p styleName="description">Our artisan code-crafting process leverages cutting-edge industry best practices and a powerful toolchain built on the latest technologies.</p>
        <div styleName="aboutCard">
          <i styleName="aboutIcon" className="fa fa-github" />
          <div styleName="aboutContent">
            <h3 styleName="aboutHeader"><b>GitHub</b>: Source Control <a href="https://github.com/rdelfin/idb" styleName="link" className="fa fa-external-link" target="_blank" /></h3>
            <p>We used GitHub for source control, allowing us all to work on the same code at the same time. Git provides a complete history of our codebase, a way to easily resolve merge conflicts, and a way to figure out who broke the build.</p>
            <div styleName="stats">
              <div>Commits: 323</div>
              <div>Pull requests: 2</div>
              <div>Unit tests: 0</div>
            </div>
          </div>
        </div>
        <div styleName="aboutCard">
          <i styleName="aboutIcon" className="fa fa-trello" />
          <div styleName="aboutContent">
            <h3 styleName="aboutHeader"><b>Trello</b>: Issue Tracking <a href="https://trello.com/b/eYMtMgrg" styleName="link" className="fa fa-external-link" target="_blank" /></h3>
            <p>We used Trello to keep track of what we are working on and what we need to complete before the project deadline.</p>
            <div styleName="stats">
              <div>Open issues: 13</div>
              <div>Closed issues: 37</div>
              <div>Resource links: 8</div>
            </div>
          </div>
        </div>
        <div styleName="aboutCard">
          <img styleName="aboutImage" src="/static/images/apiary.png" />
          <div styleName="aboutContent">
            <h3 styleName="aboutHeader"><b>Apiary</b>: API Documentation <a href="http://docs.rdelfin.apiary.io" styleName="link" className="fa fa-external-link" target="_blank" /></h3>
            <p>Even though we don't have an API yet, we used Apiary to document what our API should eventually look like once we implement it.</p>
            <div styleName="stats">
              <div>Documented endpoints: 4</div>
              <div>Implemented endpoints: 4</div>
            </div>
          </div>
        </div>
        <div styleName="aboutCard">
          <img styleName="aboutImage" src="/static/images/npm.png" />
          <div styleName="aboutContent">
            <h3 styleName="aboutHeader"><b>NPM</b>: Package Management</h3>
            <p>Also known as the Node Package Manager, we downloaded many of our development tools using this standard frontend development tool, including <b>React, React Router, Babel, Webpack, Flow, CSS Loader, and SASS</b>.</p>
            <div styleName="stats">
              <div>Dependencies installed: 600</div>
            </div>
          </div>
        </div>
        <div styleName="aboutCard">
          <img styleName="aboutImage" src="/static/images/react.svg" />
          <div styleName="aboutContent">
            <h3 styleName="aboutHeader"><b>React</b>: View Controller</h3>
            <p>React is a rendering library that allows us to write modular view-controllers that handle our app rendering declaratively.</p>
            <div styleName="stats">
              <div>Components: 23</div>
            </div>
          </div>
        </div>
        <div styleName="aboutCard">
          <i styleName="aboutIcon" className="fa fa-file-code-o" />
          <div styleName="aboutContent">
            <h3 styleName="aboutHeader">The Nerdy Stuff</h3>
            <p>
              For client-side routing, we used <b>React Router</b>. This allows us to modify
              browser history for a more stremlined browsing experience. For transpilation and
              packaging, we used <b>Babel</b> and <b>Webpack</b>, respectively. This lets us use extended
              JavaScript features that aren't supported in all browsers by compiling the code down
              to stuff browsers can read. We used <b>Flow</b> for static type-checking, which saves
              lots of debugging time by preventing many types of stupid but common mistakes. And
              for modularized CSS with variable support, we used <b>CSS Loader</b> with <b>SASS</b>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
