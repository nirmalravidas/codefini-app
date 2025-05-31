import { View} from 'react-native'
import React from 'react'
import CourseDetailsScreen from '@/src/screens/courses/course.details.screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Easing, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const CourseDetails = () => {

  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View 
      entering={FadeInUp.duration(350).easing(Easing.in(Easing.ease))}
      exiting={FadeOutUp.duration(350).easing(Easing.out(Easing.ease))}
      className='flex-1 ' style={{paddingBottom: insets.bottom, backgroundColor: colors.backgroundColor}}>
      <CourseDetailsScreen/>
    </Animated.View>
  )
}

export default CourseDetails