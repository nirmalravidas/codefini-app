import { View, Text } from 'react-native'
import React from 'react'
import BookmarksScreen from '@/src/screens/bookmarks/bookmarks.screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, { SlideInRight, SlideOutRight, Easing } from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const Bookmarks = () => {

  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View
      style={{ paddingBottom: tabBarHeight, backgroundColor: colors.backgroundColor}} className='flex-1'>
      <BookmarksScreen/>
    </View>
  )
}

export default Bookmarks;
