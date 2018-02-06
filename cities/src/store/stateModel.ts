import { PreviousSessions } from '../interfaces';

export interface StateModel {
  currentSession: {
    currentPlayer: string;
    currentCity: string;
    currentLetter: string;
  } | null;
  previousSessions: PreviousSessions;
  gameInProgress: boolean;
}
