import React from 'react';
import Tile from './Tile';

interface RowProps {
  word: string;
  target?: string;
}

const Row: React.FC<RowProps> = ({ word, target }) => {
  const tiles = Array.from({ length: 5 }, (_, i) => {
    const letter = word[i] || "";
    let status: "correct" | "present" | "absent" | undefined;

    if (target && letter) {
      if (letter === target[i]) {
        status = "correct";
      } else if (target.includes(letter)) {
        status = "present";
      } else {
        status = "absent";
      }
    }

    return <Tile key={i} letter={letter} status={status} />;
  });

  return <div className="flex space-x-2">{tiles}</div>;
};

export default Row;
