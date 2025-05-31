import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '@/src/screens/home/home.screen';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useThemeColors } from '@/src/hooks/useThemeColors';

  const Home = () => {

  const tabBarHeight = useBottomTabBarHeight();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{paddingTop: insets.top, paddingBottom: tabBarHeight, backgroundColor: colors.backgroundColor}} className='flex-1'>
      <HomeScreen/>
    </View>
  )
}

export default Home;
