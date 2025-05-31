import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useCompilerStore } from "@/src/store/useCompilerStore";
import { useThemeColors } from '@/src/hooks/useThemeColors';

export default function CodeOutputScreen() {
  const colors = useThemeColors();
  const { output, clearOutput, isLoading } = useCompilerStore();

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.backgroundColor }}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="mt-4 text-lg font-bold" style={{color: colors.textSecondaryLightColor}}>Output:</Text>

        <TouchableOpacity
          onPress={clearOutput}
          className="px-4 py-3 rounded-lg min-w-24" style={{ backgroundColor: colors.dangerColor }}
        >
          <Text
            style={{ color: '#ffffff', textAlign: 'center', fontWeight: '600', fontSize: 14 }} className="text-center font-bold"
            
          >
            Clear Output
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 rounded-lg p-2 mt-2"
        style={{ backgroundColor: colors.codeEditorBackgroundColor }}
      >
        {isLoading ? (
          <View className="items-center justify-center h-40">
            <ActivityIndicator size="large" color={colors.primaryColor} />
            <Text className="mt-2" style={{ color: colors.codeEditorTextColor }}>
              Running code...
            </Text>
          </View>
        ) : (
          <Text
            className="font-mono"
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              color: colors.codeEditorTextColor,
            }}
          >
            {output || "Output will appear here..."}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
