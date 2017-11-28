// @flow
import type {Player, Coach, Season, Team} from './fetcher';
import type {NodeSpec} from './graph';

const pic = document.getElementById('pic');
const name = document.getElementById('name');
const links = document.getElementById('links');

export function inspect(node: NodeSpec) {
  pic.setAttribute('src', node.data.pic_link);
  name.innerText = node.tooltip;
  links.innerHTML = '';
  let el;
  switch (node.group) {
    case 0: // player
    case 1: // coach
    el = document.createElement('li');
    el.innerText = `Team: ${node.data.team}`;
    links.appendChild(el);
    break;

    case 2: // season
    el = document.createElement('li')
    el.innerText = `AFC Champion: ${node.data.afc_champion}`;
    links.appendChild(el);
    el = document.createElement('li')
    el.innerText = `NFC Champion: ${node.data.nfc_champion}`;
    links.appendChild(el);
    el = document.createElement('li')
    el.innerText = `Superbowl Champion: ${node.data.super_bowl_champion}`;
    links.appendChild(el);
    break;

    default: // team
    el = document.createElement('li');
    el.innerText = 'None';
    links.appendChild(el);
  }
}
