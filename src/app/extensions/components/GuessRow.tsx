import React from "react";
import { Alert, Flex } from "@hubspot/ui-extensions";


export const GuessRow = ({ guess, targetWord }) => {
  return (
    <Flex direction="row" gap="sm">
      {guess.split('').map((letter, index) => {
        let status: 'tip' | 'success' | 'warning' = 'tip';  // white for wrong letter
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
