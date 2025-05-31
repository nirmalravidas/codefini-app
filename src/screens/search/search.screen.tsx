import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchScreen = () => {

  const colors = useThemeColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const courseMetaList = useCourseHubStore((state) => state.courseMetaList);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on the query
  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    return courseMetaList.filter((course) =>
      course.courseTitle.toLowerCase().includes(query) ||
      course.language.toLowerCase().includes(query) ||
      course.courseDescription.toLowerCase().includes(query) ||
      course.slug.toLowerCase().includes(query)
    );
  }, [searchQuery, courseMetaList]);

  const renderItem = ({ item }: { item: typeof courseMetaList[0] }) => (
    <TouchableOpacity
      onPress = {()=> {
        router.push(`/(routes)/course-details?slug=${item.slug}`);
        console.log(item.slug);
      }}
      activeOpacity={0.7}
                
      key={item.id}
      className='w-full p-4'
    >

    <View className=' border border-transparent rounded-3xl flex-row items-center justify-normal px-4 py-2' 
      style={{ 
        shadowColor: colors.primaryColor, 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 8, 
        elevation: 5, 
        backgroundColor: colors.backgroundColor}}>
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
            <Text className='text-base font-primary-bold font-bold' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textPrimaryColor }}>
              {item.courseTitle}
            </Text>
            <Text className='text-xs' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}>
              {item.courseDescription}
            </Text>
          </View>
        </View>

      </View>

    </View>

    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ paddingBottom: insets.bottom, backgroundColor: colors.backgroundColor,}}>
      <LinearGradient
        colors={[colors.headerColor, colors.secondHeaderColor, colors.thirdHeaderColor]}
        start={{ x: 0, y: 0}}
        end={{ x: 0, y: 1 }}
      >
        <View className='flex px-4 py-6 ' style={{ backgroundColor: colors.backgroundColor }}>
          {/* searchBar */}
          <View className='rounded-2xl border border-transparent mt-8 py-2' style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 12, backgroundColor: colors.backgroundColor }}>
            <View className='flex-row items-center'>
              <View className='px-4'>
                <Ionicons name='search' size={24} color={colors.mutedColor}/>
              </View>
              
                <TextInput
                  placeholder='Search by course title, language, keywords...'
                  placeholderTextColor={colors.mutedColor}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  returnKeyType='search'
                  className='flex-1 text-sm font-primary-regular' style={{ color: colors.textPrimaryColor, backgroundColor: colors.thirdHeaderColor, borderRadius: 12 }}
                />
                {searchQuery.trim().length > 0 && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSearchQuery('')}
                    className="pr-4"
                    hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                  >
                    <Ionicons name="close-circle" size={32} color={colors.mutedColor} />
                  </TouchableOpacity>
                )}
              
            </View>
          </View>
        </View>
      </LinearGradient>
        

      {searchQuery.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
            <View className="mb-2">
              <Ionicons name="search" size={42} color={colors.mutedColor} />
            </View>
            <View>
              <Text className="text-center text-sm" style={{ color: colors.textSecondaryColor }}>Search for courses, modules, and topics.</Text>
            </View>
        </View>
      ) : filteredCourses.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <View className="mb-2">
              <Entypo name="emoji-sad" size={24} color={colors.mutedColor} />
            </View>
            <View>
              <Text className="text-center" style={{ color: colors.textSecondaryColor }}>No matching courses found.</Text>
            </View>
        </View>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default SearchScreen;
