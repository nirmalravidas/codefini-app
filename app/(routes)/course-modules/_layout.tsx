import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const Layout = () => {

    const colors = useThemeColors();
  return (
    <Stack>
        <Stack.Screen
            name='index'
            options={{
                title: 'Modules',
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 22,
                },
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colors.headerColor,
                },

                headerShadowVisible: true,
                headerBackVisible: false,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={()=> router.back()}
                        className='flex-row items-center'
                        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    >
                        <AntDesign
                            name='left'
                            size={20}
                            color={'#fff'}
                            
                        />
                    </TouchableOpacity>
                ),

                headerRight: () => (
                    <TouchableOpacity
                        onPress={()=> router.push('/(tabs)')}
                        className='flex-row items-center'
                        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    >
                        <Entypo
                            name="home"
                            size={20}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                ),
            }}
        />
    </Stack>
  )
}

export default Layout;
