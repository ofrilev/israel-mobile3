import { Stack } from 'expo-router';

export default function UtilitiesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="map"
        options={{
          title: 'Map Demo',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="test"
        options={{
          title: 'NativeWind Test',
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
