import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  Keyboard,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { use, useEffect, useRef, useState } from 'react';
import { useCompilerStore } from '@/src/store/useCompilerStore';
import LanguageDropdown from '@/src/components/ui/LanguageDropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { doesCodeRequireInput } from '@/src/utils/codeInputDetector';
import { useThemeColors } from '@/src/hooks/useThemeColors';

export default function CodeEditorScreen() {

  const colors = useThemeColors();
  
  const {
    code,
    setCode,
    setInput,
    executeCode,
    language,
    isLoading,
  } = useCompilerStore();

  const resetCompiler = useCompilerStore((state) => state.reset);

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const lineCount = Math.max(code.split('\n').length, 1);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => `${i + 1}`).join('\n');

  const verticalScrollRef = useRef<ScrollView>(null);
  const lineScrollRef = useRef<ScrollView>(null);

  const syncScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    lineScrollRef.current?.scrollTo({ y, animated: false });
  };

  useEffect(() => {
    if (code.trim() === '') {
      setInput('');
    }
  }, [code]);
  
  const runAndNavigate = () => {
    if (doesCodeRequireInput(code)) {
      router.push('/(tabs)/compiler/codeInput');
    } else {
      router.push('/(tabs)/compiler/codeOutput');
      executeCode();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 16, paddingBottom: tabBarHeight, }}>

        {/* language selector */}
        <View className='flex-row justify-between items-center w-full px-2 '>
          <View className='w-[55%]'>
            <LanguageDropdown />
          </View>
          
          <View className='flex-row items-center justify-between mt-6 w-[45%]'>

            <TouchableOpacity
              onPress={resetCompiler}
              className=" px-4 py-3 rounded-lg min-w-24 mr-2"
              style={{ backgroundColor: colors.dangerColor }}
            >
              <Text style={{ color: colors.resetCodeColor, textAlign: 'center', fontWeight: '600', fontSize: 14 }} className="text-center font-bold">
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={runAndNavigate}
              disabled={isLoading}
              className="px-4 py-3 rounded-lg min-w-24" style={{ backgroundColor: colors.primaryColor }}
            >
              <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: '600', fontSize: 14 }} className="text-center font-bold">
                Run
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Code Editor */}
        <View
          style={{
            marginTop: 4,
            borderRadius: 12,
            borderColor: colors.codeEditorBackgroundColor,
            flexDirection: 'row',
            backgroundColor: colors.codeEditorBackgroundColor,
            overflow: 'hidden',
            
            
          }}
          className='flex-1 '
        >
          {/* Line Numbers */}
          <ScrollView
            ref={lineScrollRef}
            contentContainerStyle={{ padding: 10, paddingLeft: 4 }}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.codeEditorLineNumberColor, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
          >
            <Text
              style={{
                color: colors.codeEditorNumberLineTextColor,
                fontFamily: 'monospace',
                textAlign: 'right',
                fontSize: 16,
                lineHeight: 22,
                minWidth: 32,
              }}
            >
              {lineNumbers}
            </Text>
          </ScrollView>

          {/* Code Input */}
          <ScrollView
            ref={verticalScrollRef}
            onScroll={syncScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: colors.codeEditorBackgroundColor }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <TextInput
                value={code}
                onChangeText={setCode}
                multiline
                scrollEnabled
                placeholder="Write your code here..."
                placeholderTextColor= {colors.codeEditorPlaceholderColor}
                textAlignVertical="top"
                style={{
                  minHeight: 300,
                  minWidth: 500,
                  flexGrow: 1,
                  fontSize: 16,
                  lineHeight: 22,
                  padding: 10,
                  fontFamily: 'monospace',
                  color: colors.codeEditorTextColor
                }}

              />
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
