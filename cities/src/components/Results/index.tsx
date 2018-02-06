import * as React from 'react';
import { PreviousSessions } from '../../interfaces';

export interface Props {
  previousSessions: PreviousSessions;
}

const Results = (props: Props) => {
  const renderItems = () => {
    if (props.previousSessions.choices.length) {
      return props.previousSessions.choices.map((choice, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{choice.city}</td>
            <td>{choice.chosedByUser ? 'Игрок' : 'Компьютер'}</td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td colSpan={3}>Ходов пока не было</td>
      </tr>
    );
  };
  return (
    <table className="table is-hoverable is-striped">
      <thead>
        <tr className="is-selected">
          <th>Ход</th>
          <th>Город</th>
          <th>Игрок</th>
        </tr>
      </thead>
      <tbody>{renderItems()}</tbody>
    </table>
  );
};

export default Results;
