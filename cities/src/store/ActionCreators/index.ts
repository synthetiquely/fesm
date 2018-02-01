import * as actionTypes from '../actionTypes';

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
