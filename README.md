# Roll-a-Dice App

This project is a simple **Roll-a-Dice** application built using React. The goal of this app is to enhance understanding of React components, state management, and event handling.

## Features

- Roll a dice with a button click.
- Display the result of the dice roll.
- Learn React fundamentals like:
   - Functional components
   - Props and state
   - Event handling

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/rn-roll-a-dice.git
    ```
2. Navigate to the project directory:
    ```bash
    cd rn-roll-a-dice
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:
```bash
npm start
```
Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
/src
   /components
      Dice.js        # Dice component
      RollButton.js  # Button to roll the dice
   App.js           # Main application file
   index.js         # Entry point
```

## How It Works

1. The app consists of a `Dice` component that displays the current dice value.
2. A `RollButton` component triggers the dice roll.
3. The state is managed in the `App` component, which passes props to child components.

## Learning Outcomes

- Understand how to break down a UI into reusable components.
- Manage state and props effectively.
- Handle user interactions in React.

## License

This project is licensed under the MIT License.