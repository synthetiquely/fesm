import Game from './components/Game';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
    gameInProgress: state.game.gameInProgress,
  };
};

export default connect<any, any>(mapStateToProps, {})(Game);
