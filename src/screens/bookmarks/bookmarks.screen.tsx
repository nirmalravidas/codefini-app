import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BookmarksScreen = () => {
  const colors = useThemeColors();
  const router = useRouter();
  const bookmarks = useCourseHubStore((state) => state.bookmarks);
  const courseDetailsMap = useCourseHubStore((state) => state.courseDetailsMap);
  const isLoading = useCourseHubStore((state) => state.isLoading);
  const loadBookmarks = useCourseHubStore((state) => state.loadBookmarks);

  // Load bookmarks from AsyncStorage (optional if already loaded in root)
  useEffect(() => {
    loadBookmarks();
  }, []);

  // Filter courses that exist in courseDetailsMap
  const bookmarkedCourses = bookmarks
    .map((slug) => courseDetailsMap[slug])
    .filter((course) => course !== undefined);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primaryColor}/>
        <Text className="mt-2" style={{ color: colors.textSecondaryColor }}>Loading bookmarks...</Text>
      </View>
    );
  }

  return (
    
      <View className="flex-1 px-3" style={{ backgroundColor: colors.backgroundColor }}>
        {bookmarkedCourses.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <View className='flex-1 justify-center items-center'>
              <View className="mb-2">
                <MaterialCommunityIcons name="bookmark-off-outline" size={24} color={colors.mutedColor} />
              </View>
              <View className='justify-center items-center'>
                <Text className="text-center font-bold" style={{color: colors.textSecondaryColor}}>No bookmarks found.</Text>
                <Text className="text-center mt-2" style={{color: colors.textSecondaryColor}}>
                  You haven’t bookmarked any courses yet.
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={bookmarkedCourses}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={()=>(
              <View className="my-4 px-3">
                <View className="flex-row my-4 px-3">
                  <View className='flex-1 items-center justify-center'>
                    <Text className="text-xl font-primary-bold font-bold" style={{ color: colors.primaryColor }}>
                      My Bookmarked Courses
                    </Text>
                  </View>
                </View>
              </View>
            )}
            renderItem={({item})=> (
              <>
                <TouchableOpacity
                  onPress={() => router.push(`/(routes)/course-details?slug=${item.slug}`)}
                  activeOpacity={0.7}
                  className="flex mb-6"
                  style={{ maxWidth: '48%' }}
                >
                  <View
                    className="rounded-3xl border border-transparent overflow-hidden p-6"
                    style={{
                      shadowColor: colors.primaryColor,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 5,
                      backgroundColor: colors.backgroundColor,
                    }}
                  >
                    <View
                      className="w-full justify-center items-center overflow-hidden relative"
                      style={{ aspectRatio: 16 / 9 }}
                    >
                      <Image
                        source={{ uri: item.courseBannerImageLink }}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%', borderRadius: 16 }}
                      />
                      <View className="absolute top-2 right-2 p-1 rounded-full z-10">
                        <FontAwesome name="bookmark" size={10} color={colors.bookmarkBatchColor} />
                      </View>
                    </View>


                    <View className="flex py-2 min-h-28">
                      <Text
                        className="text-base mb-2 font-primary-bold font-bold"
                        numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}
                      >
                        {item.courseTitle}
                      </Text>
                      <Text className='text-xs' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}>
                        {item.courseDescription}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={()=> {
                        router.push(`/(routes)/course-details?slug=${item.slug}`);
                      }}
                      activeOpacity={0.7}
                      className='flex-row items-center justify-center p-2 rounded-xl shadow-md' style={{ backgroundColor: colors.primaryLightColor }}
                    >
                      <Text className='text-center text-sm font-bold font-primary-bold' style={{ color: '#ffffff' }}>
                        View Course
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        )}
      </View>
    
  );
};

export default BookmarksScreen;
