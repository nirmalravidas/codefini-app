import { useCompilerStore } from '@/src/store/useCompilerStore';
import { Dropdown, Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { View, Text } from 'react-native';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const languages = [
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'PHP', value: 'php' },
];

export default function LanguageDropdown() {
  const colors = useThemeColors();
  const { language, setLanguage } = useCompilerStore();

  return (
    <View className="mr-4 my-3">
      <Text className="text-sm font-semibold mb-2" style={{ color: colors.textSecondaryLightColor, backgroundColor: colors.thirdHeaderColor }}>
        Choose Language
      </Text>
      <Dropdown
        data={languages}
        labelField="label"
        valueField="value"
        value={language}
        onChange={item => setLanguage(item.value)}
        placeholder="Select Language"
        
        style={{
          backgroundColor: colors.backgroundColor,
          borderRadius: 12,
          borderColor: colors.codeEditorLineNumberColor,
          borderWidth: 1,
          paddingVertical: 12,
          paddingHorizontal: 16,

        }}
        placeholderStyle={{
          fontSize: 14,
          color: colors.codeEditorPlaceholderColor,

        }}
        selectedTextStyle={{
          fontSize: 14,
          borderRadius: 12,
          color: colors.primaryColor,
          fontWeight: '500',
        }}
        itemTextStyle={{
          fontSize: 14,
          color: colors.codeEditorTextColor,
        }}
        containerStyle={{
          borderRadius: 12,
          borderColor: colors.textPrimaryColor,
          overflow: 'hidden',
          backgroundColor: colors.codeEditorGutterColor,
        }}


        activeColor={colors.codeEditorSelectedBackgroundColor}
      />
    </View>
  );
}
