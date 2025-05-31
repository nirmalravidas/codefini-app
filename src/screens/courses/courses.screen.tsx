import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import { useRouter } from 'expo-router';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import Animated, { Easing, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CoursesScreen = () => {

  const insets = useSafeAreaInsets();
  const router = useRouter(); 
  const { courseMetaList, error, fetchAllCoursesMeta } = useCourseHubStore();

  const [loading, setLoading] = useState(true);
  const colors = useThemeColors();

  useEffect(() => {
    const fetchCourses = async () => {
      // console.log('[HomeScreen] Starting to fetch courses meta...');
      try {
        await fetchAllCoursesMeta();
        // console.log('[HomeScreen] Fetch completed successfully.');
  
        const updatedList = useCourseHubStore.getState().courseMetaList;
        //console.log('[HomeScreen] Updated courseMetaList:', updatedList);
      } catch (err) {
        const errorMessage = err || 'Unknown error occurred';
        console.error('[HomeScreen] Error fetching courses:', errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, [fetchAllCoursesMeta]);

  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View className='flex justify-center items-center pb-10'>
          {
            courseMetaList.map((item) => (
              
              <TouchableOpacity
                onPress = {()=> {
                  router.push(`/(routes)/course-details?slug=${item.slug}`);
                  // console.log(item.slug);
                }}
                activeOpacity={0.7}
                key={item.id}
                className='w-full p-4'
              >

                <Animated.View 
                  entering={SlideInUp.delay(500).duration(500).easing(Easing.in(Easing.ease))}
                  exiting={SlideOutUp.duration(500).easing(Easing.out(Easing.ease))}
                  className='border border-transparent rounded-3xl flex-row items-center justify-normal px-4 py-2'style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, backgroundColor: colors.backgroundColor }}
                >
                  <View className='w-32 h-20 rounded-xl overflow-hidden' style={{ aspectRatio: 16 / 9 }}>
                    <Image
                      source={{uri: item.courseBannerImageLink}}
                      resizeMode='cover'
                      style={{ width: '100%', height: '100%', borderRadius: 16 }}
                    />
                  </View>

                  <View className='flex-1 p-6'>

                    <View className='flex-1 justify-between'>

                      <View className='min-h-20'>
                        <Text className='text-base font-primary-bold font-bold' numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.textSecondaryColor }}>
                          {item.courseTitle}
                        </Text>
                        <Text className='text-xs' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}>
                          {item.courseDescription}
                        </Text>
                      </View>

                       {/* a horixontal line */}
                      <View className='h-px mt-3' style={{ backgroundColor: colors.borderColor }}/>

                      <View className='flex-row items-center justify-between py-2'>
                        <View>
                          <Text className='text-xs font-primary-bold font-bold' style={{ color: colors.primaryColor }}>
                            {item.pricingType.charAt(0).toUpperCase() + item.pricingType.slice(1)}
                          </Text>
                        </View>

                        <View className='flex-row items-center justify-between'>
                          <FontAwesome name='book' size={12} color={colors.mutedColor}  className='mr-1' style={{ color: colors.mutedColor }}/>
                          <Text className='text-xs font-primary-bold font-bold' style={{ color: colors.mutedColor }}>
                            {item.totalModules} Modules
                          </Text>
                        </View>
                      </View>

                    </View>

                  </View>

                </Animated.View>

              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default CoursesScreen;
