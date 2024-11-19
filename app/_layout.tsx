import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

// Re-export the ErrorBoundary for better error handling.
export { ErrorBoundary } from 'expo-router';

// Configure initial route to start at the authentication page.
export const unstable_settings = {
  initialRouteName: 'authentication',
};

// Prevent the splash screen from auto-hiding until assets are loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Handle font loading errors.
  useEffect(() => {
    if (fontsError) {
      throw fontsError;
    }
  }, [fontsError]);

  // Hide the splash screen once fonts are loaded.
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Render nothing until fonts are loaded.
  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Authentication Screen */}
        <Stack.Screen
          name="authentication"
          options={{
            title: 'Authenticate',
            headerShown: false, // Full-screen experience
          }}
        />
        {/* Tab-based Layout */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // Tabs manage their own headers
          }}
        />
        {/* Modal Screen */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal', // Modal presentation style
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}