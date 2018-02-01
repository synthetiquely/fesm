export interface StateModel {
  currentSession: {
    currentPlayer: string;
    currentCity: string;
    currentLetter: string;
  } | null;
  previousSessions: {
    choices: {
      city: string;
      chosedByUser: boolean;
    }[];
  };
  gameInProgress: boolean;
}
