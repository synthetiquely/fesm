import { StateModel } from '../stateModel';
import { GameActions } from '../actionCreators/game';
import * as actionTypes from '../actionTypes';

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
          currentLetter: action.payload.slice(-1),
        },
      };
    case actionTypes.CITY_CHOSED_BY_COMPUTER:
      return {
        ...state,
        currentSession: {
          currentPlayer: 'computer',
          currentCity: action.payload,
          currentLetter: action.payload.slice(-1),
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
