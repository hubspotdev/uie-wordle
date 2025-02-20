import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Input } from "@hubspot/ui-extensions";
import { GuessRow } from "./GuessRow";


export const GameBoard = ({ runServerless, sendAlert }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("REACT");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const gameEnded = isGameOver || guesses.length >= 5;

  useEffect(() => {
    fetchNewWord();
  }, []);

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    fetchNewWord();
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5) {
      sendAlert({ message: "Guess must be 5 letters!", type: "danger" });
      return;
    }
    if (guesses.length >= 5) {
      sendAlert({ message: "Game over! You've used all 5 guesses.", type: "error" });
      return;
    }

    const upperGuess = currentGuess.toUpperCase();
    setGuesses([...guesses, upperGuess]);
    setCurrentGuess("");

    if (upperGuess === targetWord) {
      sendAlert({ message: "Congratulations! You've won! 🎉", type: "success" });
      setIsGameOver(true);
    }
  };

  const fetchNewWord = async () => {
    try {
      setIsLoading(true);
      const response = await runServerless({
        name: 'getRandomWord'
      });
      console.log(`👀 Are you peeking? Ok, well the word is ${response.response.body.word}!`);
      setTargetWord(response.response.body.word);
    } catch (error) {
      console.error('Error:', error);
      sendAlert({
        message: "Failed to fetch new word.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex direction="row" justify="between" align="end" gap="md" >
        <Box flex={4}>
          <Input
            label='Guess'
            name="currentGuess"
            value={currentGuess}
            onChange={setCurrentGuess}
            placeholder="Enter 5-letter word"
            readOnly={gameEnded}
          />
        </Box>

        <Box flex={1}>
          {gameEnded ? (
            <Button onClick={resetGame}>
              Reset Game
            </Button>
          ) : (
            <Button onClick={handleSubmitGuess}>
              Guess
            </Button>
          )}
        </Box>
      </Flex>

      <Flex direction="column" gap="md">
        {guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess} targetWord={targetWord} />
        ))}
      </Flex>
    </>
  );
};
