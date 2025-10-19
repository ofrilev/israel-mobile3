# App Directory Structure

## Overview
The app directory has been restructured using Expo Router's grouped routes for better organization and maintainability.

## New Structure

```
src/app/
├── _layout.tsx              # Root layout with main navigation
├── index.tsx                # Welcome/Home screen with improved UI
├── (game)/                  # Game-related screens (grouped route)
│   ├── _layout.tsx          # Game-specific layout with blue theme
│   └── board.tsx            # Main game board (renamed from Board.tsx)
└── (utilities)/             # Development/utility screens (grouped route)
    ├── _layout.tsx          # Utilities layout with themed headers
    ├── map.tsx              # Map demo screen
    └── test.tsx             # NativeWind styling test screen
```

## Route Structure

### Main Routes
- `/` - Welcome screen with game launcher
- `/(game)/board` - Main game board with geography quiz
- `/(utilities)/map` - Map demonstration screen
- `/(utilities)/test` - NativeWind styling test

### Navigation Paths
```typescript
// Start game
router.navigate("/(game)/board", { params: { gamePhase: GamePhase.CITIES } });

// Open map demo
router.navigate("/(utilities)/map");

// Open style test
router.navigate("/(utilities)/test");
```

## Benefits

### 🎯 **Organized by Purpose**
- **Game screens** grouped together with consistent theming
- **Utility screens** separated for development/testing
- **Clear separation** between production and development features

### 🎨 **Themed Layouts**
- **Game layout**: Blue theme matching game aesthetic
- **Utilities layout**: Different colors for each utility (purple for map, green for test)
- **Consistent headers** with proper styling

### 🚀 **Improved Home Screen**
- **Better UI** with Israel flag emoji and descriptive text
- **Clear call-to-action** with prominent "Start Game" button
- **Easy access** to utility screens for development
- **Professional appearance** with proper spacing and colors

### 📱 **Better Navigation**
- **Grouped routes** keep related screens together
- **Nested layouts** allow for screen-specific styling
- **Clean URLs** that make sense semantically

## File Naming Conventions
- **lowercase** file names (board.tsx instead of Board.tsx)
- **descriptive** directory names with parentheses for grouping
- **consistent** _layout.tsx files for each group

This structure makes the app more maintainable, easier to navigate, and provides a better development experience.
