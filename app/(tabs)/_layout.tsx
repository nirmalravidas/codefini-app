import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo, Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons} from '@expo/vector-icons'
import { Pressable, View } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import Animated, {BounceIn, BounceOut, Easing} from 'react-native-reanimated';
import { useThemeColors } from '@/src/hooks/useThemeColors';


const Layout = () => {

  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={({route})=>{
        return {
          tabBarIcon: ({ color, focused }) => {
            let icon;
            const size = 28;

            if (route.name === 'index') {
              icon = focused
                ? <Ionicons name="home" size={size} color={color} />
                : <Ionicons name="home-outline" size={size} color={color} />;
            } else if (route.name === 'courses/index') {
              icon = focused
                ? <Ionicons name="book" size={size} color={color} />
                : <Ionicons name="book-outline" size={size} color={color} />;
            } else if (route.name === 'search/index') {
              icon = focused
                ? <FontAwesome name="search" size={size} color={color} />
                : <Feather name="search" size={size} color={color} />;
            } else if (route.name === 'compiler') {
              icon = focused
                ? <Ionicons name="code-slash" size={size} color={color} />
                : <Feather name="code" size={size} color={color} />;
            } else if (route.name === 'bookmarks/index') {
              icon = focused
                ? <Ionicons name="bookmark" size={size} color={color} />
                : <Ionicons name="bookmark-outline" size={size} color={color} />;
            } else {
              icon = <Ionicons name="help-circle-outline" size={size} color={color} />;
            }

            if (focused) {
              return (
                <Animated.View
                  entering={BounceIn.duration(350).easing(Easing.in(Easing.circle))}
                  exiting={BounceOut.duration(350).easing(Easing.out(Easing.circle))}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: colors.primaryLightColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16,
                    shadowColor: colors.primaryColor,
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    elevation: 6,
                  }}
                >
                  {icon}
                </Animated.View>
              );
            }

            return icon;
          },

          tabBarActiveTintColor: '#ffffff',

          tabBarInactiveTintColor: colors.bottomTabIconColor,

          headerShown: route.name === 'courses/index' || route.name === 'resources/index' || route.name === 'bookmarks/index' || route.name === 'compiler'
            ? true
            : false,

          headerTitle:
            route.name === 'courses/index'
              ? "Courses"
              : route.name === 'resources/index'
              ? "Resources"
              : route.name === 'bookmarks/index'
              ? "Bookmarks"
              : route.name === 'compiler'
              ? "Code Compiler"
              : " ",

            headerTitleStyle: {
              color: '#fff',
              fontSize: 22,
              
            },

            headerTitleAlign: 'center',


            headerStyle: {
              backgroundColor: colors.headerColor,
            },

            tabBarShowLabel: false,

            tabBarStyle: {
              position: 'absolute',
              paddingTop: 5,
              borderColor: colors.borderColor,
              borderTopWidth: 0.3,
              paddingHorizontal: 12,
              
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            
              elevation: 10,
              shadowColor: colors.primaryLightColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.41,
              shadowRadius: 10,
              backgroundColor: colors.backgroundColor
            },

            tabBarItemStyle: {
              marginBottom: 10,
            },

            animationEnabled: false,
            animationDuration: 0,
            animationTimingFunction: 'linear',
            animationTransition: '',
            tabBarBackgroundColor: colors.backgroundColor,

            tabBarButton: (props)=> {
              const {accessibilityState, children, ...rest} = props;
              const focused = accessibilityState?.selected;

              return (
                <PlatformPressable
                  {...rest}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  
                  }}
                  android_ripple={{ 
                    color: colors.rippleColor,
                    radius: 28,
                    borderless: true,
                  }}
                >
                  {children}
                </PlatformPressable>
              );
            },
            
        }
      }}
    >
      

      <Tabs.Screen name='index'/>
      <Tabs.Screen name='search/index'/>
      <Tabs.Screen name='compiler'/>
      <Tabs.Screen name='courses/index'/>
      <Tabs.Screen name='bookmarks/index'/>
    </Tabs>
  )
}

export default Layout
