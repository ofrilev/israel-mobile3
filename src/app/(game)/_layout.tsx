import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="board" 
        options={{ 
          title: 'Israel Geography Game',
          headerStyle: {
            backgroundColor: '#4FC3F7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack>
  );
}
