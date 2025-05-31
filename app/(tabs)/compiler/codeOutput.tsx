import { View, Text } from 'react-native'
import React from 'react'
import CodeCompilerOutput from '@/app/(routes)/code-compiler/code-compiler-output'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const codeOutput = () => {

  const colors = useThemeColors();
  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CodeCompilerOutput/>
    </View>
  )
}

export default codeOutput