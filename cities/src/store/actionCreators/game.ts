import * as actionTypes from '../actionTypes';
import axios, { AxiosResponse, AxiosError, AxiosPromise } from 'axios';
import { Store } from 'redux';
import { StoreModel } from '../index';
import { loadingToggled, errorSet, HelpersActions } from './helpers';
import {
  initializeGoogleMapsPlacesService,
  initializeGoogleMapsAutocompleteService,
  getOptionsForGoogleMapService,
  getRandomCityFromArray,
} from '../../utils';

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

export function cityHaphazardlyChosed(): any {
  return (dispatch: Dispatch, getState: () => StoreModel) => {
    dispatch(loadingToggled(true));
    const userChoice = getState().game.currentSession;

    if (userChoice) {
      const service = initializeGoogleMapsAutocompleteService();

      service.getPlacePredictions(
        { input: userChoice.currentLetter, types: ['(cities)'] },
        (predictions: any) => {
          dispatch(loadingToggled(false));
          if (predictions.length) {
            const previousChoices = getState().game.previousSessions.choices;
            const city = getRandomCityFromArray(predictions, previousChoices);
            dispatch(cityChosedByComputer(city));
            dispatch(nextSessionStarted());
          } else {
            dispatch(
              errorSet('Кажется, у компьютера закончились варианты. Похоже, что вы победили.'),
            );
          }
        },
      );
    }
  };
}

export function cityFetched(city: string): any {
  return (dispatch: Dispatch, getState: () => StoreModel) => {
    dispatch(errorSet(null));
    dispatch(loadingToggled(true));
    const service = initializeGoogleMapsPlacesService('g-map');
    const searchParams = getOptionsForGoogleMapService(city, { types: '(cities)', language: 'ru' });
    service.textSearch(searchParams, (predictions: any[]) => {
      dispatch(loadingToggled(false));

      if (predictions.length) {
        const previousChoices = getState().game.previousSessions.choices;
        const isCityAlreadyChosed = !!previousChoices.find(
          choice => choice.city.toLowerCase() === city.toLowerCase(),
        );

        if (!isCityAlreadyChosed) {
          dispatch(cityChosedByUser(city));
          dispatch(nextSessionStarted());
          dispatch(cityHaphazardlyChosed());
        } else {
          dispatch(errorSet('Этот город уже был. Выберите другой'));
        }
      } else {
        dispatch(errorSet('Похоже такого города не существует, выберите другой'));
      }
    });
  };
}

type Dispatch = (action: GameActions | HelpersActions | ThunkAction | Promise<GameActions>) => any;
type ThunkAction = (dispatch: Dispatch, getState: () => StoreModel) => AxiosPromise;
