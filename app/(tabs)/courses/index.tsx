import { View, Text } from 'react-native'
import React from 'react'
import CoursesScreen from '@/src/screens/courses/courses.screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, { Easing, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const Courses = () => {

  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: tabBarHeight, backgroundColor: colors.backgroundColor}} className='flex-1'>
      <CoursesScreen/>
    </View>
  )
}

export default Courses;
