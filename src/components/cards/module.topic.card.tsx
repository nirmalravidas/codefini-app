import { View, Text } from 'react-native'
import React from 'react'
import { Topic } from '@/src/types/types'
import { useThemeColors } from '@/src/hooks/useThemeColors';

const ModuleTopicCard: React.FC<Topic> = ({
  topicId,
  topicTitle,
  topicContent,
  position
}) => {

  const colors = useThemeColors();
  
  return (
    <View className='border border-transparent rounded-2xl flex-row items-center justify-normal p-6 mb-2'
    style={{ shadowColor: colors.primaryColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, backgroundColor: colors.backgroundColor }}
>
      <View className='flex-1 min-h-10 items-start justify-center'>
          <Text className='text-base font-primary-semibold font-bold' numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.textSecondaryColor }}>
            {position}. {topicTitle} 
          </Text>
      </View>
    </View>
  )
}

export default ModuleTopicCard