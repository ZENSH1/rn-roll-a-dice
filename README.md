# Roll-a-Dice App

A React Native application that simulates rolling a dice with animations and user management features.

## Features

- **User Management**
  - Add, edit, and delete user names
  - Animated list view with show/hide functionality
  - Modal-based user input interface

- **Dice Rolling**
  - Animated dice rolling with 3D rotation
  - Visual feedback with dice face images
  - Roll result display
  - User-specific roll history

- **UI/UX**
  - Dark/Light theme support
  - Themed components (buttons, text, cards, inputs)
  - Smooth animations and transitions
  - Responsive layout

## Technical Implementation

### State Management
- Custom hooks for managing application state:
  - `useNames`: Handles user management functionality
  - `useRolls`: Manages dice rolling logic and animations

### Database Integration
- WatermelonDB for local data persistence
- Models:
  - User: Stores user information
  - DiceRoll: Records dice roll history

### Components
- Themed components for consistent UI:
  - ThemedButton
  - ThemedCard
  - ThemedInput
  - ThemedText
  - Spacer

### Navigation
- Expo Router for screen navigation
- Screens:
  - Index (User Management)
  - DiceRoll Screen
  - History Screen

## Development Stack

- React Native
- Expo
- TypeScript
- WatermelonDB
- React Native Reanimated
- Expo Router

## Project Structure

```plaintext
├── app/
│   ├── index.tsx           # Main screen
│   ├── diceRollScreen.tsx  # Dice rolling screen
│   ├── historyScreen.tsx   # Roll history screen
│   └── _layout.tsx         # Navigation layout
├── components/
│   ├── ThemedButton.tsx
│   ├── ThemedCard.tsx
│   ├── ThemedInput.tsx
│   ├── ThemedText.tsx
│   └── Spacer.tsx
├── hooks/
│   ├── useNames.ts         # User management logic
│   └── useRolls.ts         # Dice rolling logic
└── db/
    ├── functions.ts        # Database operations
    └── models/
        ├── User.ts
        └── DiceRoll.ts```
