import { View, Text } from 'react-native'
import React from 'react'
import CodeCompilerInput from '@/app/(routes)/code-compiler/code-compiler-input'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const codeInput = () => {

  const colors = useThemeColors();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CodeCompilerInput/>
    </View>
  )
}

export default codeInput