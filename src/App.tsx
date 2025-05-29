import React, { useEffect, useState } from "react";
import Board from "./components/Board";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const App: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [targetWord, setTargetWord] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const fetchWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?length=5"
      );
      const data = await response.json();
      setTargetWord(data[0].toUpperCase());
    } catch (error) {
      console.error("Failed to fetch word", error);
      setTargetWord("REACT");
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const restartGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setStatusMessage("");
    fetchWord();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!targetWord || guesses.length >= MAX_GUESSES || statusMessage) return;

    if (e.key === "Enter") {
      if (currentGuess.length === WORD_LENGTH) {
        const guess = currentGuess.toUpperCase();
        const newGuesses = [...guesses, guess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (guess === targetWord) {
          setStatusMessage("🎉 Congrats! You guessed the word!");
          return;
        }

        if (newGuesses.length === MAX_GUESSES) {
          setStatusMessage(`😞 Game over! The word was: ${targetWord}`);
          return;
        }
      }
    } else if (e.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 relative">
      <h1 className="text-3xl font-bold mb-4">Word Guess</h1>

      {statusMessage && (
        <div className="mb-4 p-4 bg-gray-700 rounded text-center text-lg">
          <p>{statusMessage}</p>
          <button
            onClick={restartGame}
            className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Restart Game
          </button>
        </div>
      )}

      {!targetWord ? (
        <p>Loading word...</p>
      ) : (
        <>
          <Board
            guesses={guesses}
            currentGuess={currentGuess}
            targetWord={targetWord}
          />
          {/* Disable input if game ended */}
          {!statusMessage && (
            <input
              className="absolute inset-0 w-full h-full opacity-0"
              autoFocus
              onKeyDown={handleKeyPress}
              spellCheck="false"
              aria-label="Word input"
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
