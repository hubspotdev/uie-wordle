import React, { useState , useEffect} from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  hubspot,
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));


// GuessRow component to display a single guess
const GuessRow = ({ guess, targetWord }) => {
  return (
    <Flex direction="row" gap="small">
      {guess.split('').map((letter, index) => {
        let status = 'tip';  // grey for wrong letter
        if (letter === targetWord[index]) {
          status = 'success';  // green for correct position
        } else if (targetWord.includes(letter)) {
          status = 'warning';  // yellow for wrong position
        }

        return (
          <Alert
            key={index}
            variant={status}
            title={letter.toUpperCase()}
          >
          </Alert>
        );
      })}
    </Flex>
  );
};

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {

  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("REACT");
  const [isGameOver, setIsGameOver] = useState(false);
  const gameEnded = isGameOver || guesses.length >= 5;
  const [isLoading, setIsLoading] = useState(false);

  // Add useEffect to fetch word on component mount
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
            <Button onClick={resetGame} >
              Reset Game
            </Button>
          ) : (
            <Button onClick={handleSubmitGuess} >
              Guess
            </Button>
          )}
        </Box>
      </Flex>

      <Divider />

      <Flex direction="column" gap="small">
        {guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess} targetWord={targetWord} />
        ))}
      </Flex>

    </>
  );
};
