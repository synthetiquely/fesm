import * as actionTypes from '../actionTypes';

export type GameActions =
  | CityFetched
  | CityFetchedByComputer
  | CityChosedByUser
  | CityChosedByComputer
  | GameStarted
  | GameFinished
  | CurrentSessionCleared;

export interface CityChosedByUser {
  type: actionTypes.CITY_CHOSED_BY_USER;
  payload: string;
}

export interface CityChosedByComputer {
  type: actionTypes.CITY_CHOSED_BY_COMPUTER;
  payload: string;
}

export interface GameStarted {
  type: actionTypes.GAME_STARTED;
}

export interface GameFinished {
  type: actionTypes.GAME_FINISHED;
}

export interface CurrentSessionCleared {
  type: actionTypes.CURRENT_SESSION_CLEARED;
}

export interface CityFetched {
  type: actionTypes.CITY_FETCHED;
  payload: string;
}

export interface CityFetchedByComputer {
  type: actionTypes.CITY_FETCHED_BY_COMPUTER;
}

export function gameStarted(): GameStarted {
  return {
    type: actionTypes.GAME_STARTED,
  };
}

export function gameFinished(): GameFinished {
  return {
    type: actionTypes.GAME_FINISHED,
  };
}

export function nextSessionStarted(): CurrentSessionCleared {
  return {
    type: actionTypes.CURRENT_SESSION_CLEARED,
  };
}

export function cityChosedByUser(city: string): CityChosedByUser {
  return {
    type: actionTypes.CITY_CHOSED_BY_USER,
    payload: city,
  };
}

export function cityChosedByComputer(city: string): CityChosedByComputer {
  return {
    type: actionTypes.CITY_CHOSED_BY_COMPUTER,
    payload: city,
  };
}

export function cityHaphazardlyChosed(): CityFetchedByComputer {
  return {
    type: actionTypes.CITY_FETCHED_BY_COMPUTER,
  };
}

export function cityFetched(city: string): CityFetched {
  return {
    type: actionTypes.CITY_FETCHED,
    payload: city,
  };
}
