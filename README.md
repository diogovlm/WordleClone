# Pokémon Wordle Clone

## Description

This is a Wordle-inspired game built using React Native, where players guess the names of Pokémon instead of fixed-length words. The game allows users to guess Pokémon names of varying lengths, offering a new twist on the traditional Wordle format.

## Features


Feedback System: Each guessed name shows:
Green: Correct letter in the correct position.
Yellow: Correct letter but in the wrong position.
Gray: Letter is not in the Pokémon's name.

No Fixed Name Length: Unlike traditional Wordle, this version allows guesses with varying lengths, as Pokémon names do not have a fixed number of letters.
Database of Pokémon Names: The game draws from a comprehensive database of Pokémon names.

- **Pokémon Name Guessing**: Players can guess the names of Pokémon.
- **Feedback System**: Each guessed name shows:
    -  **Green**: Correct letter in the correct position.
    - **Yellow**: Correct letter but in the wrong position.
    - **Gray**: Letter is not in the Pokémon's name.
- **No Fixed Name Length**: Unlike traditional Wordle, this version allows guesses with varying lengths, as Pokémon names do not have a fixed number of letters.

## Technologies Used

- **React Native**: The mobile framework used to build the application.
- **Expo**: For simplifying the development process and running the app.
- **JavaScript (ES6+)**: The programming language used for game logic and interactivity.

## Pré-requisitos

Para executar o projeto localmente, você precisará de um navegador web moderno.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/diogovlm/WordleClone.git
```

### 2. Navigate to the project directory:

```bash
cd WordleClone
```

### 3. npm install

```bash
npm install
```

### 4. Start the project

You can run the project using Expo so you can run in your own device or using an emulator.

Start the project using Expo:
```bash
npm start
```

Start the project using Androind Emulator:
```bash
npm run Androin
```

## Project Structure

```plaintext
WordleClone/
│
├── src/                    # Core application logic and components
│   ├── components/          # UI components (e.g., keyboard, game board)
│   └── utils/               # Utility functions for game logic
│
├── assets/                  # Images, fonts, and other assets
├── App.js                   # Main React Native entry point
├── app.json                 # App configuration
├── babel.config.js          # Babel configuration for React Native
├── jest.config.js           # Jest configuration for testing
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```
