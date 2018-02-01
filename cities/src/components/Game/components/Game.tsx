import React from 'react';
import Form from '../../Form';
import Map from '../../Map';
import Results from '../../Results';

interface Props {
  gameInProgress: boolean;
}

export interface State {}

class Game extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { gameInProgress } = this.props;
    return (
      <div>
        <div className="columns is-centered">
          <div className="column is-narrow">
            {!gameInProgress && <button className="button is-success is-large">Начать игру</button>}
            {gameInProgress && (
              <button className="button is-danger is-large">Завершить игру</button>
            )}
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-narrow">
            <Form gameInProgress={gameInProgress} />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-narrow">
            <Map />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-narrow">
            <h3 className="title">Ходы</h3>
            <Results />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
