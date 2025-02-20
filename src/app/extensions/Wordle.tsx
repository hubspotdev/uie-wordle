import React from "react";
import {
  Divider,
  Flex,
  Heading,
  Text,
  hubspot,
} from "@hubspot/ui-extensions";
import { GameInstructions } from "./components/GameInstructions";
import { GameBoard } from "./components/GameBoard";

const Extension = ({ context, runServerless, sendAlert }) => {
  return (

    <Flex direction="column" gap="md">
      <Heading>Hey, {context.user.firstName}! Take a Wordle break!</Heading>
      <Divider />
      <GameInstructions />
      <Divider />
      <GameBoard runServerless={runServerless} sendAlert={sendAlert} />
      <Text variant="microcopy">
        * HubSpot does not own the rights to the Wordle name, trademarks, or game.
      </Text>
    </Flex>

  );
};

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));
