import * as actionTypes from '../actionTypes';

export interface HelpersModel {
  error: any;
  isLoading: boolean;
}

export const initialState: HelpersModel = {
  error: null,
  isLoading: false,
};

const helpersReducer = (
  state: HelpersModel = initialState,
  action: any,
): HelpersModel => {
  switch (action.type) {
    case actionTypes.LOADING_TOGGLED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.ERROR_SET:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default helpersReducer;
