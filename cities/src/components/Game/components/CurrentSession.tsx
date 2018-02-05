import * as React from 'react';

export interface Props {
  currentLetter: string;
  currentCity: string;
  currentPlayer: string;
}

const CurrentSession = (props: Props) => {
  const renderSession = () => {
    if (props.currentPlayer === 'computer') {
      return (
        <div>
          <h1 className="title">Компьютер выбрал "{props.currentCity}"</h1>
          <h3 className="subtitle">Выберите город на букву "{props.currentLetter}"</h3>
        </div>
      );
    }
    return <div />;
  };
  return <React.Fragment>{renderSession()}</React.Fragment>;
};

export default CurrentSession;
