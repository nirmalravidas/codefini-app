import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import { router } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import HeaderBar from '@/src/components/ui/headerbar';
import { CourseMeta } from '@/src/types/types';
import { useThemeColors } from '@/src/hooks/useThemeColors';


const getCategoriesFromData = (data: CourseMeta[]): string[] => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].language] === undefined) {
      temp[data[i].language] = 1;
    } else {
      temp[data[i].language]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};



const HomeScreen = () => {
  // const { fetchAllCoursesMeta } = useCourseHubStore();
  const ListRef = useRef<FlatList<CourseMeta> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { fetchAllCoursesMeta, courseMetaList, isLoading, error } = useCourseHubStore();

  const colors = useThemeColors();

// Log only when courseMetaList changes
  useEffect(() => {
    const fetchCourses = async () => {
      // console.log('[HomeScreen] Starting to fetch courses meta...');
      try {
        await fetchAllCoursesMeta();
        // console.log('[HomeScreen] Fetch completed successfully.');
        //const updatedList = useCourseHubStore.getState().courseMetaList;
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

  const categories = useMemo(() => getCategoriesFromData(courseMetaList), [courseMetaList]);


  const categorizedCoursesMap = useMemo(() => {
      const map: Record<string, CourseMeta[]> = { All: [...courseMetaList] };
      courseMetaList.forEach((course) => {
        const category = course.language?.toLowerCase();
        if (!category) return;

        if (!map[category]) {
          map[category] = [];
        }
        map[category].push(course);
      });
      return map;
  }, [courseMetaList]);

  const filteredFeaturedCourses = useMemo(() => {
    const categoryKey = selectedCategory.toLowerCase();
      if (selectedCategory === 'All') {
          return courseMetaList;
        }
    return categorizedCoursesMap[categoryKey] || [];
  }, [categorizedCoursesMap, selectedCategory]);


  const filteredCourses = useMemo(() => {
    if (searchQuery.trim() === '') return courseMetaList;
    return courseMetaList.filter((course) =>
      course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courseMetaList, searchQuery]);

  

  return (
      <ScrollView showsVerticalScrollIndicator={false}>
          <View className='flex px-4 py-2' style={{ backgroundColor: colors.headerColor}}>
            {/* HeaderBar */}
            <View className='flex mt-6'>
              <HeaderBar />
            </View>
          </View>


        <LinearGradient
          colors={[colors.headerColor, colors.secondHeaderColor, colors.thirdHeaderColor]}
          start={{ x: 0, y: 0}}
          end={{ x: 0, y: 1 }}
          // className='pb-2'
        >
          <View className='flex px-4 py-2'>
            {/* searchBar */}
            <View className=' rounded-full border border-transparent mt-8 py-2' style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 12, backgroundColor: colors.backgroundColor }}>
              <View className='flex-row items-center'>
                <View className='px-6'>
                  <Ionicons name='search' size={24} color={colors.searchBarIconColor}/>
                </View>
                <TextInput
                  placeholder='search courses...'
                  placeholderTextColor={colors.searchBarTextColor}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  returnKeyType='search'
                  className='flex-1 text-lg font-primary-regular'
                  style={{ color: colors.textPrimaryColor }}
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

        

        <View className='flex-1 px-2'>
            {searchQuery.trim() === '' && (
              <>
                {/* horizontal categories scroller */}
                <View className=' flex mt-2'>
                  <View >
                  {
                    loading ? (
                      <ActivityIndicator size="large" color={colors.primaryColor}/>
                    ) : (
                      
                      <FlatList
                        data={ categories }
                        horizontal
                        keyExtractor={(item) => item.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                          const isSelected = item === selectedCategory;

                          return (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => {
                                setSelectedCategory(item);
                                ListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
                              }}
                              className="flex-row items-center justify-center px-6 py-3 mx-2 my-5 rounded-full min-w-32"
                              style={{
                                backgroundColor: isSelected ? colors.primaryLightColor : colors.backgroundColor,
                                borderWidth: isSelected ? 0 : 1,
                                borderColor: isSelected ? 'transparent' : colors.borderColor,
                                ...(isSelected
                                  ? {}
                                  : {
                                      shadowColor: colors.primaryColor,
                                      shadowOffset: { width: 0, height: 0 },
                                      shadowOpacity: 0.2,
                                      shadowRadius: 10,
                                      elevation: 8,
                                    }),
                              }}
                            >
                              <Text
                                style={{
                                  color: isSelected ? '#ffffff' : colors.textSecondaryColor,
                                  fontFamily: 'primary-semibold',
                                  fontSize: 14,
                                  textAlign: 'center',
                                }}
                              >
                                {item}
                              </Text>
                            </TouchableOpacity>

                          );
                        }}
                      />
                      
                    )
                  }
                  </View>
                  
                </View>

                {/* Featured Section */}
                <View className='flex'>
                  <View style={{ backgroundColor: colors.backgroundColor }}>
                    {
                      loading ? (
                        <ActivityIndicator size={"large"} color={colors.primaryColor}/>
                      ):(
                        <FlatList
                          horizontal
                          data={filteredFeaturedCourses}
                          keyExtractor={(item) => item.id}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              className='flex mx-2 mt-2 mb-6'
                              onPress={()=> {
                                router.push(`/(routes)/course-details?slug=${item.slug}`);
                              }}
                            >
                              <View className=' w-72 border border-transparent shadow-lg rounded-3xl p-6' style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 8, backgroundColor: colors.backgroundColor }}>
                                <View className='w-full rounded-2xl overflow-hidden' style={{aspectRatio: 16/9}}>
                                  <Image
                                    source={{uri: item.courseBannerImageLink}}
                                    resizeMode='cover'
                                    style={{width: '100%', height: '100%', borderRadius: 16}}
                                  />
                                </View>

                                <View className="py-2 min-h-28">
                                  <Text className='text-base font-bold font-primary-bold mb-2' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor}}>
                                    {item.courseTitle}
                                  </Text>
                                  <Text className='text-xs' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}>
                                    {item.courseDescription}
                                  </Text>
                                </View>

                                
                                {/* add view course button using TouchableOpacity */}
                                <TouchableOpacity
                                  onPress={()=> {
                                    router.push(`/(routes)/course-details?slug=${item.slug}`);
                                  }}
                                  activeOpacity={0.7}
                                  className='flex-row items-center justify-center p-2 rounded-xl shadow-md'
                                  style={{ backgroundColor: colors.primaryLightColor }}
                                >
                                  <Text className='text-center text-sm font-bold font-primary-bold' style={{ color: '#ffffff' }}>
                                    View Course
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          )}
                        />

                      )
                    }
                      
                  </View>
                </View>
              </>
            )}

            {/* Courses */}
            <View className='pb-10'>
              <View className='flex py-4 mt-4 mb-2 px-2'>
                {searchQuery.trim() === '' && (
                  <>
                    <Text className='text-xl font-primary-bold font-bold' style={{ color: colors.textPrimaryColor }}>
                      Courses
                    </Text>
                  </>
                )}
                  
                <View className="h-px my-2" style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5, backgroundColor: colors.backgroundColor }}/>
              </View>

              <View>
                {
                  loading ? (
                    <ActivityIndicator size={"large"} color={colors.primaryColor}/>
                  ):(
                    <FlatList
                      data={filteredCourses}
                      keyExtractor={(item)=> item.id}
                      numColumns={2}
                      scrollEnabled={false}
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={()=> {
                            router.push(`/(routes)/course-details?slug=${item.slug}`);
                          }}
                          activeOpacity={0.8}
                          className='flex-1 mb-6 mx-2' style={{ maxWidth: '48%' }}
                        >
                          <View className='rounded-3xl border border-transparent overflow-hidden p-6' style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, backgroundColor: colors.backgroundColor }}>
                            <View className='w-full justify-center items-center overflow-hidden' style={{ aspectRatio: 16 / 9 }}>
                              <Image
                                source={{uri: item.courseBannerImageLink}}
                                resizeMode='cover'
                                style={{ width: '100%', height: '100%', borderRadius: 16 }}
                              />
                            </View>

                            <View className='flex py-2 min-h-28'>
                              <Text className='text-base font-bold font-primary-bold mb-2' numberOfLines={2} style={{ color: colors.textSecondaryColor }}>
                                {item.courseTitle}
                              </Text>
                              <Text className='text-xs' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}>
                                {item.courseDescription}
                              </Text>
                            </View>

                            {/* a horixontal line */}
                            <View className='h-px' style={{ backgroundColor: colors.borderColor }}/>

                            <View className='flex-row items-center justify-between py-2'>
                              <View>
                                <Text className='text-xs font-primary-bold font-bold' style={{ color: colors.primaryColor }}>
                                  {item.pricingType.charAt(0).toUpperCase() + item.pricingType.slice(1)}
                                </Text>
                              </View>
                              <View className='flex-row items-center justify-between'>
                                <FontAwesome name='book' size={12} color={colors.mutedColor}  className='mr-1'/>
                                <Text className='text-xs font-primary-bold font-bold text-muted-color' style={{ color: colors.mutedColor }}>
                                  {item.totalModules} Modules
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}

                      ListEmptyComponent={() =>
                        !loading && (
                          <View className="items-center justify-center py-12">
                            <Text className="text-muted-color mt-4 text-lg font-primary-regular" style={{ color: colors.mutedColor }}>
                              No courses found
                            </Text>
                          </View>
                        )
                      }

                    />
                  )
                }
                
              </View>
            </View>
        </View>
      </ScrollView>
  )
}

export default HomeScreen;
