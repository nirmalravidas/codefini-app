import { View, Text } from 'react-native'
import React from 'react'
import CodeInputScreen from '@/src/screens/compiler/code.compiler.input.screen'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const CodeCompilerInput = () => {

  const colors = useThemeColors();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CodeInputScreen/>
    </View>
  )
}

export default CodeCompilerInput
