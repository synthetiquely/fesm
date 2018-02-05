import { StateModel } from '../stateModel';
import { GameActions } from '../actionCreators/game';
import * as actionTypes from '../actionTypes';
import { extractLastLetter } from '../../utils';

export const initialState: StateModel = {
  currentSession: null,
  previousSessions: { choices: [] },
  gameInProgress: false,
};

const gameReducer = (state: StateModel = initialState, action: GameActions): StateModel => {
  switch (action.type) {
    case actionTypes.GAME_STARTED:
      return {
        ...initialState,
        gameInProgress: true,
      };
    case actionTypes.GAME_FINISHED:
      return {
        ...state,
        currentSession: null,
        gameInProgress: false,
      };
    case actionTypes.CURRENT_SESSION_CLEARED:
      if (state.currentSession) {
        return {
          ...state,
          previousSessions: {
            choices: [
              ...state.previousSessions.choices,
              {
                city: state.currentSession.currentCity,
                chosedByUser: state.currentSession.currentPlayer === 'player' ? true : false,
              },
            ],
          },
        };
      }
      return state;
    case actionTypes.CITY_CHOSED_BY_USER:
      return {
        ...state,
        currentSession: {
          currentPlayer: 'player',
          currentCity: action.payload,
          currentLetter: extractLastLetter(action.payload),
        },
      };
    case actionTypes.CITY_CHOSED_BY_COMPUTER:
      return {
        ...state,
        currentSession: {
          currentPlayer: 'computer',
          currentCity: action.payload,
          currentLetter: extractLastLetter(action.payload),
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
