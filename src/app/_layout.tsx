import { Stack } from 'expo-router';
import "../../global.css";
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  return (
   
    <Stack>
   
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="test" options={{ title: 'NativeWind Test' }} />
        <Stack.Screen name="map" options={{ title: 'Map' }} />
    
      </Stack>
  );
}
