import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { theme } from '@/src/theme/theme';

export default function Index() {

  const router = useRouter();
  const colors = useThemeColors();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primaryColor }}>
      <View className="flex-1 justify-center items-center px-6">
        {/* App Logo */}
        <View className="w-32 h-32 mb-2" style={{ aspectRatio: 1 }}>
          <Image
            source={theme.logo}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        {/* Welcome Text */}
        <Text className="text-white text-3xl font-primary-bold font-bold text-center mb-6">
          {theme.appName}
        </Text>

        {/* Tagline */}
        <Text className="text-white font-primary-regular text-lg text-center mb-8">
          Unlock Your Next Skill
        </Text>

        {/* Navigation Button */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)')}
          activeOpacity={0.7}
          className="flex-row items-center justify-center bg-white py-3 px-6 rounded-full"
        >
          <Text className="font-primary-semibold font-semibold text-lg mr-3" style={{color: colors.primaryColor}}>
            Get Started
          </Text>
          <Feather name="arrow-right-circle" size={24} color={colors.primaryColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
