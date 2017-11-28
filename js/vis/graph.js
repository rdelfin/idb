// @flow
const d3 = require('d3');
const d3tip = require('d3-tip');
import {fetchPlayers, fetchCoaches, fetchSeasons, fetchTeams} from './fetcher';
import {inspect} from './inspector';
import type {Player, Coach, Season, Team} from './fetcher';

const vis = d3.select('#vis');

const color = d3.scaleOrdinal(d3.schemeCategory10);
const sim = d3.forceSimulation()
  .force('link', d3.forceLink().id(d => d.id).strength(0.1))
  .force('charge', d3.forceManyBody().strength(-20).distanceMax(500))
  // .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
  .force('xcenter', d3.forceX(window.innerWidth / 2).strength(0.003))
  .force('ycenter', d3.forceY(window.innerHeight / 2).strength(0.003));
const tip = d3tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => d.tooltip);
vis.call(tip);

let players: Array<NodeSpec> = [];
let coaches: Array<NodeSpec> = [];
let seasons: Array<NodeSpec> = [];
let teams: Array<NodeSpec> = [];
let allData: Array<NodeSpec> = [];
let links: Array<LinkSpec> = [];
let done = 0;

export type NodeSpec = {
  id: string;
  tooltip: string;
  group: number;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  data: Object;
};

type LinkSpec = {
  source: string;
  target: string;
};

const linkContainer = vis.append('g').attr('class', 'links');
let linkEls;

const nodeContainer = vis.append('g').attr('class', 'nodes');
let nodes = nodeContainer.selectAll('circle');

function updateNodes(newNodes: Array<Object>) {
  allData.push.apply(allData, newNodes);
  nodes = nodes.data(allData).enter().append('circle')
      .attr('r', 8)
      .attr('fill', d => color(d.group))
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', inspect)
    .merge(nodes);
  sim.nodes(allData).on('tick', onTicked);
  sim.alpha(1).restart();
}

function updatePlayers(newPlayers: Array<Object>) {
  const specs = newPlayers.map(specPlayer);
  players.push.apply(players, specs);
  updateNodes(specs);
  refreshLinks();
}

function updateCoaches(newCoaches: Array<Object>) {
  const specs = newCoaches.map(specCoach);
  coaches.push.apply(coaches, specs);
  updateNodes(specs);
  refreshLinks();
}

function updateSeasons(newSeasons: Array<Object>) {
  const specs = newSeasons.map(specSeason);
  seasons.push.apply(seasons, specs);
  updateNodes(specs);
}

function updateTeams(newTeams: Array<Object>) {
  const specs = newTeams.map(specTeam);
  teams.push.apply(teams, specs);
  updateNodes(specs);
}

function specPlayer(player: Player): NodeSpec {
  const team = getTeam(player.team);
  let x, y;
  if (team == null) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  } else {
    x = team.x;
    y = team.y;
    links.push({
      source: player.id,
      target: team.id,
    });
  }
  return {
    id: player.id,
    tooltip: `${player.first_name} ${player.last_name}`,
    group: 0,
    x: x,
    y: y,
    data: player,
  };
}

function specCoach(coach: Coach): NodeSpec {
  const team = getTeam(coach.team);
  let x, y;
  if (team == null) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  } else {
    x = team.x;
    y = team.y;
    links.push({
      source: coach.id,
      target: team.id,
    });
  }
  return {
    id: coach.id,
    tooltip: `${coach.first_name} ${coach.last_name}`,
    group: 1,
    x: x,
    y: y,
    data: coach,
  };
}

function specSeason(season: Season): NodeSpec {
  return {
    id: '' + season.id,
    tooltip: `${season.year} Season`,
    group: 2,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    data: season,
  };
}

function specTeam(team: Team): NodeSpec {
  return {
    id: team.id,
    tooltip: `${team.team_name} (${team.team_alias})`,
    group: 3,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    data: team,
  };
}

function refreshLinks() {
  linkEls = linkEls.data(links).enter().append('line')
      .attr('stroke', '#888')
      .attr('stroke-width', '4px')
    .merge(linkEls);
  sim.force('link').links(links);
  sim.alpha(1).restart();
}

function onTicked() {
  nodes.attr('cx', d => d.x);
  nodes.attr('cy', d => d.y);

  linkEls = linkContainer.selectAll('line').data(links);
  linkEls.attr('x1', d => d.source.x);
  linkEls.attr('y1', d => d.source.y);
  linkEls.attr('x2', d => d.target.x);
  linkEls.attr('y2', d => d.target.y);
}

function phase1() {
  fetchTeams(updateTeams, phase2);
}

function phase2() {
  fetchSeasons(updateSeasons, phase3);
}

function phase3() {
  seasons.forEach(season => {
    let team = getTeam(season.data.afc_champion);
    if (team) {
      links.push({
        source: season.id,
        target: team.id,
      });
    }
    team = getTeam(season.data.nfc_champion);
    if (team) {
      links.push({
        source: season.id,
        target: team.id,
      });
    }
    team = getTeam(season.data.super_bowl_champion);
    if (team) {
      links.push({
        source: season.id,
        target: team.id,
      });
    }
  });
  refreshLinks();
  fetchCoaches(updateCoaches, phase4);
}

function phase4() {
  fetchPlayers(updatePlayers, () => {});
}

function getTeam(alias) {
  return teams.find(team => team.data.team_alias === alias);
}

phase1();

window.addEventListener('resize', () => {
  console.log('window resize');
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  sim.force('xcenter').x(x);
  sim.force('ycenter').y(y);
  sim.alpha(1).restart();
});
