import * as React from 'react';

export interface Props {}

const Results = (props: Props) => (
  <table className="table is-hoverable is-striped">
    <thead>
      <tr className="is-selected">
        <th>Ход</th>
        <th>Город</th>
        <th>Игрок</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <th>Минск</th>
        <th>Вы</th>
      </tr>
      <tr>
        <th>1</th>
        <th>Минск</th>
        <th>Вы</th>
      </tr>
      <tr>
        <th>1</th>
        <th>Минск</th>
        <th>Вы</th>
      </tr>
      <tr>
        <th>1</th>
        <th>Минск</th>
        <th>Вы</th>
      </tr>
      <tr>
        <th>1</th>
        <th>Минск</th>
        <th>Вы</th>
      </tr>
    </tbody>
  </table>
);

export default Results;
