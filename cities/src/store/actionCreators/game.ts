import * as actionTypes from '../actionTypes';
import axios, { AxiosResponse, AxiosError, AxiosPromise } from 'axios';
import { Store } from 'redux';
import { StoreModel } from '../index';
import { loadingToggled, errorSet, HelpersActions } from './helpers';

declare const google: any;

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

export type GameActions =
  | CityChosedByUser
  | CityChosedByComputer
  | GameStarted
  | GameFinished
  | CurrentSessionCleared;

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

export function cityFetched(city: string) {
  return (dispatch: Dispatch, getState: () => StoreModel) => {
    dispatch(errorSet(null));
    dispatch(loadingToggled(true));

    const service = new google.maps.places.PlacesService(document.getElementById('map'));

    service.textSearch(
      {
        query: city,
        types: '(cities)',
        language: 'ru',
      },
      (predictions: any[]) => {
        dispatch(loadingToggled(false));

        if (predictions.length) {
          const previousChoices = getState().game.previousSessions.choices;
          const isCityAlreadyChosed = !!previousChoices.find(choice => choice.city === city);

          if (!isCityAlreadyChosed) {
            dispatch(cityChosedByUser(city));
          } else {
            dispatch(errorSet('Этот город уже был. Выберите другой'));
          }
        } else {
          dispatch(errorSet('Похоже такого города не существует, выберите другой'));
        }
      },
    );
  };
}

type Dispatch = (action: GameActions | HelpersActions | ThunkAction | Promise<GameActions>) => any;
type ThunkAction = (dispatch: Dispatch, getState: () => StoreModel) => AxiosPromise;