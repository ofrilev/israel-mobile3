# Board Component Modular Structure

## Overview

The Board component has been refactored into a modular structure for better maintainability and separation of concerns.

## File Structure

### Core Hooks

- **`useGameBoard.ts`** - Main game logic, map interactions, scoring
- **`useTimerEvents.ts`** - Timer event handling and ghost modal state

### Components

- **`GhostModalContent.tsx`** - Phase-specific modal content
- **`Board.tsx`** - Main component that orchestrates everything

## Phase-Specific Modal Content

### Cities Phase 🏙️

- Title: "Cities Round Complete!"
- Button: "Continue to Mountains"
- Encouragement: "Great job exploring Israel's cities!"

### Mountains Phase ⛰️

- Title: "Mountains Round Complete!"
- Button: "Continue to Famous Places"
- Encouragement: "You've conquered the peaks!"

### Famous Places Phase 🏛️

- Title: "Famous Places Round Complete!"
- Button: "View Final Results"
- Encouragement: "Amazing knowledge of Israel's landmarks!"

## Benefits

- **Separation of Concerns**: Each hook handles specific functionality
- **Reusability**: Hooks can be reused in other components
- **Maintainability**: Easier to modify individual features
- **Testability**: Each hook can be tested independently
- **Phase Awareness**: Modal content adapts to current game phase
