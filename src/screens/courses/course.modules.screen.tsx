import { View, Text, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import ModuleCard from '@/src/components/cards/module.card';
import Animated, { Easing, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const CourseModulesScreen = () => {

  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const courseDetailsMap = useCourseHubStore((state) => state.courseDetailsMap);
  const course = slug ? courseDetailsMap[slug] : null;

  if (!course) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg" style={{ color: colors.textSecondaryColor }}>Course not found.</Text>
      </View>
    );
  }

  if (!course) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-primary-regular" style={{ color: colors.textSecondaryColor }}>Course not found.</Text>
    </View>
  );
}


  return (
    <View className='flex py-3' style={{ backgroundColor: colors.backgroundColor }}>
      <FlatList
        data={course.modules}
        keyExtractor={(item) => item.moduleId.toString()}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        ListHeaderComponent={()=>(
          <View className="my-4 px-3">
            <View>
              <Text className="text-xl font-primary-bold font-bold" style={{ color: colors.textPrimaryColor }}>
                {course.courseTitle}
              </Text>
            </View>
            <View className='py-4'>
              <Text className='text-sm text-textSecondaryLight-color' style={{ color: colors.textSecondaryLightColor }}>
                {course.courseDescription}
              </Text>
            </View>

          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={()=>{
              router.push(`/(routes)/course-module-topic-list?moduleIndex=${index}&slug=${course.slug}`);
            }}
            activeOpacity={0.7}
            className='w-full' 
          >
            <Animated.View
              entering={SlideInUp.duration(500).easing(Easing.in(Easing.ease))}
              exiting={SlideOutUp.duration(500).easing(Easing.out(Easing.ease))} >
              <ModuleCard
                moduleId={item.moduleId}
                moduleTitle={item.moduleTitle}
                topics={item.topics}
                moduleDescription={item.moduleDescription}
                position={index+1}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default CourseModulesScreen;
