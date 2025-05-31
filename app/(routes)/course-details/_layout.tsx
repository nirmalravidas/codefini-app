import { View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { router, Stack, useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Feather, Ionicons } from '@expo/vector-icons';

const Layout = () => {

  const colors = useThemeColors();
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Course Details',
          headerTitleStyle: {
            color: '#fff',
            fontSize: 22,
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.headerColor,
            
            
          },
          headerShadowVisible: true,

          

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  router.push('/(tabs)');
                }
              }}
              className="items-center"
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
              <AntDesign name="left" size={20} color="#fff" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <Pressable
              onPress={() => router.push('/(tabs)')}
              className="items-center"
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
              <Ionicons name="home" size={20} color="#fff" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
