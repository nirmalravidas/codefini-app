import { View } from 'react-native'
import React from 'react'
import CourseModulesScreen from '@/src/screens/courses/course.modules.screen'
import Animated, { Easing, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const CourseModules = () => {

  const colors = useThemeColors();

  return (
    <Animated.View
      entering={FadeInUp.duration(350).easing(Easing.in(Easing.ease))}
      exiting={FadeOutUp.duration(350).easing(Easing.out(Easing.ease))}
      className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CourseModulesScreen/>
    </Animated.View>
  )
}

export default CourseModules