import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import * as selectors from '../selectors';
import { ReduxAction, Choice } from '../../interfaces';
import {
  getOptionsForGoogleMapService,
  getRandomCityFromArray,
} from '../../utils';
import { searchCityByName, searchCityByFirstLetter } from '../../utils/search';

function* callFetchCity(action: ReduxAction) {
  yield put({ type: actionTypes.ERROR_SET, payload: null });
  yield put({ type: actionTypes.LOADING_TOGGLED, payload: true });

  const searchParams = getOptionsForGoogleMapService(action.payload, {
    types: '(cities)',
    language: 'ru',
  });

  try {
    const response = yield call(searchCityByName, searchParams);
    yield put({ type: actionTypes.LOADING_TOGGLED, payload: false });

    if (response.length) {
      const previousSessions = yield select(selectors.previousSessions);
      const isCityAlreadyChosed = !!previousSessions.choices.find(
        (choice: Choice) =>
          choice.city.toLowerCase() === action.payload.toLowerCase(),
      );

      if (!isCityAlreadyChosed) {
        yield put({
          type: actionTypes.CITY_CHOSED_BY_USER,
          payload: action.payload,
        });
        yield put({
          type: actionTypes.CURRENT_SESSION_CLEARED,
        });
        yield put({
          type: actionTypes.CITY_FETCHED_BY_COMPUTER,
        });
      } else {
        yield put({
          type: actionTypes.ERROR_SET,
          payload: 'Этот город уже был. Выберите другой',
        });
      }
    }
  } catch (error) {
    yield put({ type: actionTypes.LOADING_TOGGLED, payload: false });
    yield put({
      type: actionTypes.ERROR_SET,
      payload: error,
    });
  }
}

function* callCityFetchedByComputer(action: ReduxAction) {
  yield put({ type: actionTypes.ERROR_SET, payload: null });
  yield put({ type: actionTypes.LOADING_TOGGLED, payload: true });

  const userChoice = yield select(selectors.userChoice);

  if (userChoice) {
    const searchParams = {
      input: userChoice.currentLetter,
      types: ['(cities)'],
    };

    try {
      const response = yield call(searchCityByFirstLetter, searchParams);
      yield put({ type: actionTypes.LOADING_TOGGLED, payload: false });

      if (response.length) {
        const previousChoices = yield select(selectors.previousChoices);
        const city = getRandomCityFromArray(response, previousChoices);
        yield put({
          type: actionTypes.CITY_CHOSED_BY_COMPUTER,
          payload: city,
        });
        yield put({
          type: actionTypes.CURRENT_SESSION_CLEARED,
        });
      } else {
        yield put({
          type: actionTypes.ERROR_SET,
          payload: 'Компьютер не может найти город на такую букву :(',
        });
      }
    } catch (error) {
      yield put({ type: actionTypes.LOADING_TOGGLED, payload: false });
      yield put({
        type: actionTypes.ERROR_SET,
        payload: error,
      });
    }
  }
}

export default function* watchGameActions(): SagaIterator {
  yield takeEvery(actionTypes.CITY_FETCHED, callFetchCity);
  yield takeEvery(
    actionTypes.CITY_FETCHED_BY_COMPUTER,
    callCityFetchedByComputer,
  );
}
