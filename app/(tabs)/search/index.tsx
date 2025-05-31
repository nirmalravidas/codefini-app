import { View, Text } from 'react-native'
import React from 'react'
import SearchScreen from '@/src/screens/search/search.screen';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const Search = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();

  return (
    <View
      
      style={{paddingTop: insets.top, paddingBottom: tabBarHeight, backgroundColor: colors.backgroundColor}} className='flex-1'>
      <SearchScreen/>
    </View>
  )
}

export default Search;
