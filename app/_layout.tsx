import '@/src/styles/global.css';
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar} from "react-native";
import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import Toast from 'react-native-toast-message';
import NetworkStatusProvider from '@/src/components/network/NetworkStatusProvider';
import { useThemeColors } from '@/src/hooks/useThemeColors';

export default function RootLayout() {

  const colors = useThemeColors();

  useEffect(() => {

    const initialize = async () => {
      try {
        SplashScreen.hide();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initialize();

  }, []);

  return (
    <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.statusBarColor}
        />
        {/* Navigation stack */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <Toast/>
        <NetworkStatusProvider />
    </SafeAreaProvider>
  );
}
