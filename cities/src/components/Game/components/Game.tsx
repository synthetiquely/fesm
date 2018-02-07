import React from 'react';
import Form from '../../Form';
import Map from '../../Map';
import Results from '../../Results';
import StartGame from './StartGame';
import CurrentSession from './CurrentSession';
import { PreviousSessions } from '../../../interfaces';

interface Props {
  apiError: any;
  isLoading: boolean;
  gameInProgress: boolean;
  currentLetter: string;
  currentCity: string;
  currentPlayer: string;
  previousSessions: PreviousSessions;
  handleStartGame: () => void;
  handleFinishGame: () => void;
  handleSubmitForm: (city: string) => void;
}

export interface State {}

class Game extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onToggleGame = () => {
    if (this.props.gameInProgress) {
      this.props.handleFinishGame();
    } else {
      this.props.handleStartGame();
    }
  };

  render() {
    const {
      currentCity,
      currentPlayer,
      currentLetter,
      gameInProgress,
      previousSessions,
      apiError,
      isLoading,
    } = this.props;
    return (
      <div>
        <StartGame
          gameInProgress={gameInProgress}
          onToggleGame={this.onToggleGame}
        />
        {gameInProgress && (
          <div className="columns is-mobile is-centered">
            <div className="column is-narrow">
              <CurrentSession
                currentCity={currentCity}
                currentPlayer={currentPlayer}
                currentLetter={currentLetter}
              />
            </div>
          </div>
        )}
        {gameInProgress && (
          <div className="columns is-mobile is-centered">
            <div className="column is-narrow">
              <Form
                currentLetter={currentLetter}
                apiError={apiError}
                isLoading={isLoading}
                gameInProgress={gameInProgress}
                handleSubmitForm={this.props.handleSubmitForm}
              />
            </div>
          </div>
        )}
        {gameInProgress && (
          <div className="columns is-centered">
            <div className="column">
              <Map choices={previousSessions.choices} />
            </div>
            <div className="column">
              <h3 className="title">Ходы</h3>
              <Results previousSessions={previousSessions} />
            </div>
          </div>
        )}
        <div id="g-map" style={{ visibility: 'hidden' }} />
      </div>
    );
  }
}

export default Game;
