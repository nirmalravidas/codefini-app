import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  Vibration,
} from "react-native";
import { useCompilerStore } from "@/src/store/useCompilerStore";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import { useThemeColors } from '@/src/hooks/useThemeColors';

export default function CodeInputScreen() {

  const colors = useThemeColors();

  const { input, setInput } = useCompilerStore();

  const runCode = () => {
    if (!input.trim()) {
      if (Platform.OS === "android") {
        Vibration.vibrate(500);
        Toast.show({
                type: 'error',
                text1: 'Enter your input values',
                text2: 'Please enter your input values before running the code.',
              });
      } else {
        Vibration.vibrate(500);
        Toast.show({
                type: 'error',
                text1: 'Missing input values',
                text2: 'Please enter your input values before running the code.',
              });
      }
      return;
    }

    router.push('/(tabs)/compiler/codeOutput');
    useCompilerStore.getState().executeCode();
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.backgroundColor }}>
      {/* Label and Run Button on the same row */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-semibold" style={{ color: colors.textSecondaryLightColor }}>Enter Custom Input:</Text>
        <TouchableOpacity
          onPress={runCode}
          className="px-4 py-3 rounded-lg min-w-24" style={{ backgroundColor: colors.primaryColor }}
        >
          <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: '600', fontSize: 14 }} className="text-center font-bold">Run</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type input values here..."
        placeholderTextColor={colors.codeEditorPlaceholderColor}
        multiline
        className="flex-1 rounded-lg text-lg"
        textAlignVertical="top"
        style={{ fontFamily: 'monospace', 
          color: colors.codeEditorTextColor, 
          backgroundColor: colors.codeEditorBackgroundColor,
          padding: 10 }}
      />
    </View>
  );
}
