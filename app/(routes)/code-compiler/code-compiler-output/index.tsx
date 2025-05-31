import { View, Text } from 'react-native'
import React from 'react'
import { useThemeColors } from '@/src/hooks/useThemeColors';
import CodeOutputScreen from '@/src/screens/compiler/code.compiler.output.screen'

const CodeCompilerOutput = () => {

  const colors = useThemeColors();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CodeOutputScreen/>
    </View>
  )
}

export default CodeCompilerOutput
