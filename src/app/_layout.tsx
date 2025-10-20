import { Stack } from 'expo-router';
import '../../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Israel Geography',
          headerStyle: {
            backgroundColor: '#4FC3F7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="(game)" options={{ headerShown: false }} />
      <Stack.Screen name="(utilities)" options={{ headerShown: false }} />
    </Stack>
  );
}
