import { View, Text } from 'react-native'
import React from 'react'
import CodeEditorScreen from '@/src/screens/compiler/code.compiler.editor.screen'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const CodeCompilerEditor = () => {

  const colors = useThemeColors();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CodeEditorScreen />
    </View>
  )
}

export default CodeCompilerEditor