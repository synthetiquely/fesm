import { StoreModel } from '../index';

export const previousSessions = (state: StoreModel) =>
  state.game.previousSessions;

export const previousChoices = (state: StoreModel) =>
  state.game.previousSessions.choices;

export const userChoice = (state: StoreModel) => state.game.currentSession;
