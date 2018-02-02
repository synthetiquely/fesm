import * as actionTypes from '../actionTypes';

export interface LoadingToggled {
  type: actionTypes.LOADING_TOGGLED;
  payload: boolean;
}

export interface ErrorSet {
  type: actionTypes.ERROR_SET;
  payload: any;
}

export function loadingToggled(isLoading: boolean): LoadingToggled {
  return {
    type: actionTypes.LOADING_TOGGLED,
    payload: isLoading,
  };
}

export function errorSet(error: any): ErrorSet {
  return {
    type: actionTypes.ERROR_SET,
    payload: error,
  };
}

export type HelpersActions = LoadingToggled | ErrorSet;
