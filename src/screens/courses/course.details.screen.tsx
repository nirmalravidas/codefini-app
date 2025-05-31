import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Vibration,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import ModuleCard from '@/src/components/cards/module.card';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBannerAd } from '@/src/hooks/admob/useBannerAd';
import { useInterstitialAd } from '@/src/hooks/admob/useInterstitialAd';
import { CourseDetails} from '@/src/types/types';

const CourseDetailsScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const fetchCourseBySlug = useCourseHubStore((state) => state.fetchCourseBySlug);
  const courseDetailsMap = useCourseHubStore((state) => state.courseDetailsMap);
  const isLoading = useCourseHubStore((state) => state.isLoading);
  const error = useCourseHubStore((state) => state.error);
  const bookmarks = useCourseHubStore((state) => state.bookmarks);
  const addBookmark = useCourseHubStore((state) => state.addBookmark);
  const removeBookmark = useCourseHubStore((state) => state.removeBookmark);

  const course = slug ? courseDetailsMap[slug] : null;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const isBookmarked = slug ? bookmarks.includes(slug) : false;

  const colors = useThemeColors();

  const { bannerComponent, isLoaded } = useBannerAd();
  const { showAd, loaded} = useInterstitialAd();

  useEffect(() => {
    const loadCourseDetails = async () => {
      if (!slug) return;
      try {
        await fetchCourseBySlug(slug);
      } catch (error: any) {
        console.error('[CourseDetailsScreen] Error fetching course:', error?.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [fetchCourseBySlug, slug]);


  const handlePressModule = () => {

    Vibration.vibrate(500);
    Toast.show({
        type: 'info',
        text1: 'Enroll to Continue',
        text2: `You need to enroll in the course to view this module.`,
      });
  };

  const handleStart = async (course: CourseDetails) => {
    
    setShowModal(false);

    try {
      await showAd(); // Wait for ad to complete or fail
    } catch (error) {
      console.warn('Ad not shown:', error);
    } finally {
      router.push(`/(routes)/course-modules?slug=${course.slug}`);
    }
  };



  const handleToggleBookmark = () => {
    if (!slug || !course) return;

    Vibration.vibrate(500);

    if (isBookmarked) {
      removeBookmark(slug);
      Toast.show({
        type: 'info',
        text1: 'Removed from bookmarks',
        text2: `${course.courseTitle} removed from bookmarks`,
      });
    } else {
      addBookmark(slug);
      Toast.show({
        type: 'success',
        text1: 'Bookmarked!',
        text2: `${course.courseTitle} added to your bookmarks.`,
      });
    }
  };

  if (loading || isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primaryColor} />
        <Text className="mt-2" style={{ color: colors.textSecondaryColor }}>Loading course...</Text>
      </View>
    );
  }

  if (error || !course) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg" style={{ color: colors.textSecondaryColor }}>{error || 'Course not found.'}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30, backgroundColor: colors.backgroundColor }} >

        {/* Banner Ad */}
        {isLoaded && (
          <View className="flex p-4 items-center">
            {bannerComponent}
          </View>
        )}

        {/* Banner */}
        <View className="p-4" style={{ aspectRatio: 16 / 9 }}>
          <Image
            source={{ uri: course.courseBannerImageLink }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%', borderRadius: 16 }}
          />
          <TouchableOpacity
            className="absolute top-6 right-6 rounded-full p-3 shadow-md"
            style={{ backgroundColor: colors.primaryColor, elevation: 5 }}
            onPress={handleToggleBookmark}
          >
            <MaterialIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-border'}
              size={24}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold font-primary-bold px-6 pt-6" style={{ color: colors.textPrimaryColor }}>
          {course.courseTitle}
        </Text>

        {/* Pricing */}
        <View className="flex-row justify-start items-center py-2 px-6 mt-4">
          <View className="flex-row items-center justify-start">
            <FontAwesome
              name="book"
              size={14}
              color={colors.textSecondaryLightColor}
              className="mr-1"
            />
            <Text className="text-xl font-primary-bold font-bold" style={{ color: colors.textSecondaryLightColor }}>
              {course.modules.length} Modules
            </Text>
          </View>

          <View>
            <Text className="text-xl px-2" style={{ color: colors.textPrimaryColor }}>
              |
            </Text>
          </View>

          <View>
            <Text className="text-xl font-primary-bold font-bold" style={{ color: colors.primaryColor }}>
              {course.pricingType.charAt(0).toUpperCase() + course.pricingType.slice(1)}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-base font-primary-regular px-6 pt-4 pb-6 leading-relaxed whitespace-pre-line" style={{ color: colors.textSecondaryColor }}>
          {course.courseDescription}
        </Text>

        {/* Modules */}
        <View className="px-4 space-y-4">
          {course.modules?.map((module, position) => (
            <TouchableOpacity
              onPress={handlePressModule}
              key={module.moduleId}
              activeOpacity={0.8}
            >
              <ModuleCard
                moduleId={module.moduleId}
                moduleTitle={module.moduleTitle}
                topics={module.topics}
                position={position + 1}
                moduleDescription={module.moduleDescription}
              />
            </TouchableOpacity>
          ))}
        </View>

          {/* Banner ad */}
        {isLoaded && (
          <View className="flex p-4 items-center">
            {bannerComponent}
          </View>
        )}

      </ScrollView>

      {/* Footer Button */}
      <View className=" p-4" style={{ backgroundColor: colors.backgroundColor, borderTopColor: colors.borderColor, borderTopWidth: 1}}>
        <TouchableOpacity
          className=" p-4 rounded-full shadow-md" style={{ backgroundColor: colors.primaryColor }}
          onPress={() => {
            Vibration.vibrate(200);
            setShowModal(true);
          }}
          activeOpacity={0.8}
        >
          <Text className="text-center text-lg font-bold font-primary-bold" style={{ color: '#ffffff' }}>
            Enroll Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
  transparent
  visible={showModal}
  animationType="fade"
  onRequestClose={() => setShowModal(false)}
  statusBarTranslucent
>
  {/* Dimmed Background */}
  <View className="flex-1 justify-center items-center px-4"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent dark background
    }}
  >
    {/* Modal Main Content */}
    <View
      className="p-6 rounded-2xl w-full max-w-md shadow-xl"
      style={{
        backgroundColor: colors.backgroundColor, // your solid modal color
      }}
    >
      <Text
        className="text-2xl font-primary-bold text-center mb-3 font-bold"
        style={{ color: colors.textSecondaryLightColor }}
      >
        Ready to Start Learning?
      </Text>
      <Text
        className="text-base text-center font-primary-regular mb-6 leading-relaxed"
        style={{ color: colors.textSecondaryLightColor }}
      >
        You're about to enroll in:{'\n'}
        <Text style={{ color: colors.textSecondaryLightColor }}>
          "{course.courseTitle}"
        </Text>
      </Text>

      <View className="flex-row justify-between items-center px-2">
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          activeOpacity={0.8}
          className="p-5 py-3 min-w-32 rounded-full items-center"
          style={{ backgroundColor: colors.dangerColor }}
        >
          <Text className="font-primary-bold font-bold text-base" style={{ color: '#ffffff' }}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleStart(course);
            
          }}
          
          
          activeOpacity={0.8}
          className="p-5 py-3 min-w-32 rounded-full items-center"
          style={{ backgroundColor: colors.primaryColor }}
        >
          <Text className="font-primary-semibold font-bold text-base" style={{ color: '#ffffff' }}>
            Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default CourseDetailsScreen;
