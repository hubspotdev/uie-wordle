# Wordle Game App Card

A custom Wordle clone built with HubSpot’s UI Extensions that can be accessed from a Contact record.

## Overview

This [private app card](https://developers.hubspot.com/docs/guides/crm/private-apps/creating-private-apps) built with UI Extensions recreates the [Wordle](https://www.nytimes.com/games/wordle/index.html) game within HubSpot, maintaining Wordle's core game mechanics.

This app card demonstrates:

- Using the `context` object returned by `hubspot.extend()` to create a personalized greeting
- Utilizing the `sendAlert` function returned by `hubspot.extend()` to provide app card alerts
- Employing a [serverless function](https://developers.hubspot.com/docs/guides/crm/ui-extensions/sdk#run-serverless-functions) to fetch random 5-digit words from [Rando](https://random-word-api.vercel.app/), the Random Word API

### Project Structure

The main extension logic lives in `src/app/extensions/Wordle.tsx`, which is the entry point and container component. The UI is broken down into components stored in the `components` directory, including:

- `GameBoard` for the main game interface
- `GameInstructions` for player guidance

## Installing the App Card

### Requirements

There are a few things that must be set up before you can make use of this project.

* You must have an active HubSpot account.
* You must have the [HubSpot CLI](https://www.npmjs.com/package/@hubspot/cli) installed and set up.
* You must have access to developer projects (developer projects are currently [in public beta under "CRM Development Tools"](https://app.hubspot.com/l/whats-new/betas)).


### Running the HubSpot Private App Locally


1. Initialize the project to generate the `hubspot.config.yml` file which contains the account information needed to run the project. Follow the prompts, select your developer account, and generate a personal access key.
```
hs init
```

2. Upload the project to your HubSpot account.

```
hs project upload
```

3. Navigate to the app card extensions directory (`src/app/extensions`) and install the dependencies.

```
npm install
```

4. Start the server for local development.

```
hs project dev
```

### Note

When making changes to configuration files ({CARD\_NAME}-card.json and app.json), be sure to stop the development server and use `hs project upload` to update the project before restarting the development server.

### Viewing the App Card

This card is configured to be viewed on Contact records. To view the card for development, navigate to any Contact record and select `Customize record`. Select the view you'd like to update from the table and choose `Add cards`.

<img width="1453" alt="Screenshot 2025-02-20 at 11 17 13 AM" src="https://github.com/user-attachments/assets/039b54a1-6b76-41ea-a452-cc3585c6f1ae" />

### Using the Wordle Card

This app card allows users to play the [Wordle game](https://www.nytimes.com/games/wordle/index.html), as popularized by the [New York Times Games](https://www.nytimes.com/games). Guess a mystery word within five guesses to win the same. After each guess, each character in your word will be highlighted to indicate how close you are to guessing the word.

If the letter is highlighted in green, the letter is in the word and is in the correct spot. If the letter is highlighted in yellow, the letter is in the word but in the wrong spot. If the letter is not highlighted, the letter is not in the word.

https://github.com/user-attachments/assets/109827c8-bf7b-43d8-b27e-45cbee02c25e

## Learn More About App Cards Powered by UI Extensions

To learn more about building public app cards, visit the [HubSpot app cards landing page](https://developers.hubspot.com/build-app-cards) and check out the [HubSpot private app cards developer documentation](https://developers.hubspot.com/docs/guides/crm/private-apps/quickstart).
