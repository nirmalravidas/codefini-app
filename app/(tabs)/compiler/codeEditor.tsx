import { View, Text } from 'react-native'
import React from 'react'
import CodeCompilerEditor from '@/app/(routes)/code-compiler/code-compiler-editor'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const codeEditor = () => {

  const colors = useThemeColors();
  
  return (
    <View className='flex-1' style={{ backgroundColor: colors.backgroundColor }}>
      <CodeCompilerEditor/>
    </View>
  )
}

export default codeEditor