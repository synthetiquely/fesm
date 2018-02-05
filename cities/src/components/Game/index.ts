import Game from './components/Game';
import { connect } from 'react-redux';
import { gameStarted, gameFinished, cityFetched } from '../../store/actionCreators/game';

interface StateToProps {
  apiError: any;
  isLoading: boolean;
  gameInProgress: boolean;
  currentPlayer: string;
  currentCity: string;
  currentLetter: string;
  previousSessions: {
    choices: {
      city: string;
      chosedByUser: boolean;
    }[];
  };
}

interface DispatchToProps {
  handleStartGame: () => void;
  handleFinishGame: () => void;
  handleSubmitForm: (city: string) => void;
}

const mapStateToProps = (state: any) => {
  return {
    currentPlayer: state.game.currentSession ? state.game.currentSession.currentPlayer : '',
    currentCity: state.game.currentSession ? state.game.currentSession.currentCity : '',
    currentLetter: state.game.currentSession ? state.game.currentSession.currentLetter : '',
    gameInProgress: state.game.gameInProgress,
    previousSessions: state.game.previousSessions,
    apiError: state.helpers.error,
    isLoading: state.helpers.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleStartGame: () => dispatch(gameStarted()),
    handleFinishGame: () => dispatch(gameFinished()),
    handleSubmitForm: (city: string) => dispatch(cityFetched(city)),
  };
};

export default connect<StateToProps, DispatchToProps>(mapStateToProps, mapDispatchToProps)(Game);
