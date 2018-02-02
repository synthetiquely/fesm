import * as React from 'react';

export interface Props {
  gameInProgress: boolean;
  onToggleGame: () => void;
}

const StartGame = (props: Props) => (
  <div className="columns is-centered">
    <div className="column is-narrow">
      {!props.gameInProgress && (
        <button onClick={props.onToggleGame} className="button is-success is-large">
          Начать игру
        </button>
      )}
      {props.gameInProgress && (
        <button onClick={props.onToggleGame} className="button is-danger is-large">
          Завершить игру
        </button>
      )}
    </div>
  </div>
);

export default StartGame;
