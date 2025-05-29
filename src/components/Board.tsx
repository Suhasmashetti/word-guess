import React from 'react';
import Row from './Row';

interface BoardProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
}

const MAX_ROWS = 6;

const Board: React.FC<BoardProps> = ({ guesses, currentGuess, targetWord }) => {
  const emptyRows = MAX_ROWS - guesses.length - 1;

  return (
    <div className="space-y-2">
      {guesses.map((guess, idx) => (
        <Row key={idx} word={guess} target={targetWord} />
      ))}
      {guesses.length < MAX_ROWS && <Row word={currentGuess} />}
      {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map((_, idx) => (
        <Row key={`empty-${idx}`} word="" />
      ))}
    </div>
  );
};

export default Board;
