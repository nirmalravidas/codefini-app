import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { PlatformPressable } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function Layout() {
  const colors = useThemeColors();
  return (
     <View style={{ flex: 1, backgroundColor: colors.thirdHeaderColor }}>
    <TopTabs
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.bottomTabIconColor,
        tabBarStyle: {
          backgroundColor: colors.thirdHeaderColor,
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: colors.codeEditorCursorGuideColor,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { 
            fontSize: 16,
            fontWeight: 'bold',
        },

        tabBarIndicatorStyle: {
          backgroundColor: colors.primaryColor,
          height: 2,
          borderRadius: 5,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colors.thirdHeaderColor,
          borderBottomWidth: 0,
        },
        tabBarPressColor: colors.rippleColor,
    }}


      
    >
      <TopTabs.Screen name="codeEditor" options={{ title: "Code" }} />
      <TopTabs.Screen name="codeInput" options={{ title: "Input" }} />
      <TopTabs.Screen name="codeOutput" options={{ title: "Output" }} />
    </TopTabs>
    </View>
  );
}
