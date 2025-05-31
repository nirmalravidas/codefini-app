import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { appName, theme } from '@/src/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useThemeStore } from '@/src/store/useThemeStore';

const HeaderBar = () => {
  const colors = useThemeColors();
  const { theme: currentTheme, toggleTheme } = useThemeStore();

  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-between">
        {/* Left: App Logo and Title */}
        <View className="flex-row items-center space-x-3">
          <View className="w-14 h-14 rounded-full overflow-hidden">
            <Image source={theme.logo} style={{ width: '100%', height: '100%',  }} />
          </View>
          <Text
            className="font-primary-bold text-3xl"
            style={{ color: '#ffffff', fontWeight: 'bold' }}
          >
            {appName}
          </Text>
        </View>

        {/* Right: Theme Toggle */}
        <TouchableOpacity
          onPress={toggleTheme}
          className="w-12 h-12 items-center justify-center rounded-full"
          style={{ 
            backgroundColor: colors.rippleColor, 
            shadowColor: colors.primaryColor, 
            shadowOffset: { width: 0, height: 0 }, 
            shadowOpacity: 0.5, 
            shadowRadius: 8, 
            elevation: 12 
          }}
          activeOpacity={0.4}
        >
          <Ionicons
            name={currentTheme === 'light' ? 'moon' : 'sunny'}
            size={20}
            color={colors.themeToggleColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;
