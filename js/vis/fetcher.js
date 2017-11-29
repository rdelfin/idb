// @flow

const throttle = require('throttle-debounce/throttle');

const DOMAIN = 'https://nfldb-backend.appspot.com';

export type Player = {
  id: string;
  last_name: string;
  first_name: string;
  bith_date: string;
  high_school: string;
  weight: number;
  height: number;
  position: string;
  jersey: number;
  rookie_year: number;
  team: string;
  pic_link: string;
};

export type Coach = {
  id: string;
  last_name: string;
  first_name: string;
  position: string;
  team: string;
  pic_link: string;
  hometown: string;
  no_super_bowl: string;
};

export type Season = {
  id: number;
  year: number;
  afc_champion: string;
  nfc_champion: string;
  start_date: string;
  end_date: string;
  super_bowl_mvp: string;
  super_bowl_champion: string;
  season_mvp: string;
  pic_link: string;
};

export type Team = {
  id: string;
  team_alias: string;
  team_name: string;
  team_market: string;
  conference: string;
  division: string;
  venue_name: string;
  venue_location: string;
  pic_link: string;
  points_rank: number;
  conference_rank: number;
  division_rank: number;
  season_wins: number;
  season_losses: number;
};

function makeFetcher<T>(url: string): (Array<T> => void, () => void) => void {
  return (onData: Array<T> => void, onDone: () => void) => {
    let pageno = 1;
    let throttledFetchNext = throttle(200, fetchNext);

    function fetchNext() {
      fetch(`${url}${pageno}`).then(res => res.json()).then(page => {
        onData(page);
        if (page.length > 0) {
          pageno++;
          throttledFetchNext();
        } else {
          onDone();
        }
      });
    }

    fetchNext();
  };
}

export const fetchPlayers = makeFetcher(`${DOMAIN}/players?page=`);
export const fetchCoaches = makeFetcher(`${DOMAIN}/coaches?page=`);
export const fetchSeasons = makeFetcher(`${DOMAIN}/seasons?page=`);
export const fetchTeams = makeFetcher(`${DOMAIN}/teams?page=`);
