import React from 'react';
import clsx from 'clsx';

interface TileProps {
  letter: string;
  status?: "correct" | "present" | "absent";
}

const Tile: React.FC<TileProps> = ({ letter, status }) => {
  const colorMap = {
    correct: "bg-green-500",
    present: "bg-yellow-500",
    absent: "bg-neutral-700",
  };

  return (
    <div
      className={clsx(
        "w-14 h-14 border-2 border-neutral-600 flex items-center justify-center text-2xl font-bold",
        status ? `${colorMap[status]} text-white` : "bg-neutral-800"
      )}
    >
      {letter}
    </div>
  );
};

export default Tile;
