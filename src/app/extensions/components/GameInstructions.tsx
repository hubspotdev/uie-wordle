/**
 * Game instructions component for the Wordle clone.
 *
 * Displays the rules and examples of how the game works, including:
 * - Basic game rules
 * - Visual example of letter colors and their meanings
 * - Explanation of the color-coding system
 */

import React from "react";
import { Text, List, Image } from "@hubspot/ui-extensions";
import wordleExample from '../assets/wordle-example.png';

export const GameInstructions = () => {
  return (
    <>
      <Text>How to Play:</Text>
      <List variant='unordered-styled'>
        <Text>Guess the word in 5 tries</Text>
        <Text>Each guess must be a valid 5-letter word</Text>
        <Text>The color of the tiles will change to show how close your guess was to the word</Text>
      </List>
      <Text>Examples:</Text>
      <Image src={wordleExample} alt="Wordle example image" width={400}/>
      <Text><Text format={{ fontWeight: 'bold' }} inline={true}>W</Text> is in the word and in the correct spot.</Text>
      <Text><Text format={{ fontWeight: 'bold' }} inline={true}>I</Text> is in the word but in the wrong spot.</Text>
      <Text><Text format={{ fontWeight: 'bold' }} inline={true}>N, E, S</Text> are not in the word in any spot.</Text>
    </>
  );
};
