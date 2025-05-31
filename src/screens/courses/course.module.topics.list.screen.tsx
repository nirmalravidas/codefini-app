import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import ModuleTopicCard from '@/src/components/cards/module.topic.card';
import Animated, { Easing, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useInterstitialAd } from '@/src/hooks/admob/useInterstitialAd';

const CourseModuleTopicsListScreen = () => {
  const { slug, moduleIndex } = useLocalSearchParams<{
    slug: string;
    moduleIndex: string;
  }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { showAd, loaded } = useInterstitialAd();

  const course = slug ? useCourseHubStore((state) => state.courseDetailsMap[slug]) : null;
  const module = course?.modules?.[parseInt(moduleIndex)];

  const handleStart = async (topicId: string, slug: string) => {
  try {
    await showAd();
  } catch (error) {
    console.warn('Ad not shown:', error);
  } finally {
    router.push(`/(routes)/course-module-topic-content?topicId=${topicId}&slug=${slug}`);
  }
};

  if (!course || !module) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg" style={{ color: colors.textSecondaryColor }}>Module not found.</Text>
      </View>
    );
  }

 

  return (
    <View className='flex py-3' style={{ backgroundColor: colors.backgroundColor }}>

      <FlatList
        data={module.topics}
        keyExtractor={(item) => item.topicId.toString()}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        ListHeaderComponent={()=>(
                  <View className="my-4 px-3">
                    <View>
                      <Text className="text-xl font-primary-bold font-bold" style={{ color: colors.textPrimaryColor }}>
                        {module.moduleTitle}
                      </Text>
                    </View>
                    <View className='py-4'>
                      <Text className='text-sm text-textSecondaryLight-color' style={{ color: colors.textSecondaryLightColor }}>
                        {module.moduleDescription}
                      </Text>
                    </View>
                  </View>
                )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>{
              
              handleStart(item.topicId, course.slug);
              
              
            }}
            activeOpacity={0.7}
          >

            <Animated.View
              entering={SlideInUp.duration(500).easing(Easing.in(Easing.ease))}
              exiting={SlideOutUp.duration(500).easing(Easing.out(Easing.ease))} >

                <ModuleTopicCard
                  topicId={item.topicId}
                  topicTitle={item.topicTitle}
                  topicContent={item.topicContent}
                  position={index + 1}
                />
              
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseModuleTopicsListScreen;
