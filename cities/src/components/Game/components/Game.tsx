import React from 'react';
import Form from '../../Form';
import Map from '../../Map';
import Results from '../../Results';
import StartGame from './StartGame';

interface Props {
  apiError: any;
  isLoading: boolean;
  gameInProgress: boolean;
  currentLetter: string;
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
    const { currentLetter, gameInProgress, apiError, isLoading } = this.props;
    return (
      <div>
        <StartGame gameInProgress={gameInProgress} onToggleGame={this.onToggleGame} />
        {gameInProgress && (
          <div className="columns is-centered">
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
            <div className="column is-narrow">
              <Map />
            </div>
          </div>
        )}
        {gameInProgress && (
          <div className="columns is-centered">
            <div className="column is-narrow">
              <h3 className="title">Ходы</h3>
              <Results />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
