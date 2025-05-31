import { View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { useCourseHubStore } from '@/src/store/useCourseHubStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as Clipboard from 'expo-clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { darkula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const CourseModuleTopicContentScreen = () => {
  const { slug, topicId } = useLocalSearchParams<{ slug: string; topicId: string }>();
  const insets = useSafeAreaInsets();
  const course = slug ? useCourseHubStore((state) => state.courseDetailsMap[slug]) : null;
  const topic = course?.modules?.flatMap((mod) => mod.topics)?.find((t) => t.topicId === topicId) || null;
  const router = useRouter();

  const colors = useThemeColors();
  const handleShare = async () => {
    if (topic) {
      try {
        await Share.share({
          message: `${topic.topicTitle}\n\n${topic.topicContent}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (!course || !topic) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg" style={{ color: colors.textSecondaryColor }}>Topic not found.</Text>
      </View>
    );
  }

  const contentParts = topic.topicContent.split(/```(\w*)\n([\s\S]*?)```/g);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-primary-bold font-bold flex-1 pr-3" style={{ color: colors.primaryColor }}>
            {topic.topicTitle}
          </Text>
          <TouchableOpacity onPress={handleShare} className="p-2 rounded-full" style={{ backgroundColor: colors.mutedColor }}>
            <Ionicons name="share-outline" size={20} color={colors.shareButtonColor} />
          </TouchableOpacity>
        </View>

        {contentParts.map((part, index) => {
          if (index % 3 === 0) {

            return (
              <Text key={index} className="text-lg font-primary-regular mb-3 leading-relaxed" style={{ color: colors.textPrimaryColor }}>
                {part.trim().split(/(\*\*.*?\*\*)/g).map((sub, i) =>
                  /^\*\*(.*?)\*\*$/.test(sub) ? (
                    <Text key={i} className="font-bold">
                      {sub.replace(/\*\*/g, '')}
                    </Text>
                  ) : (
                    sub
                  )
                )}
              </Text>
            );
          } else if ((index - 2) % 3 === 0) {
            const language = contentParts[index - 1]?.trim() || course.language || 'text';
            return (
              <View key={index} className="mb-10">
                <TouchableOpacity
                  onPress={() => Clipboard.setStringAsync(part.trim())}
                  className="self-end mt-1 px-3 py-1 rounded-tl-2xl" style={{ backgroundColor: colors.primaryColor }}
                >
                  <Text className="text-sm" style={{ color: '#ffffff' }}>copy code</Text>
                </TouchableOpacity>

                <View className='p-3 rounded-e-2xl rounded-tl-2xl' style={{ backgroundColor: colors.codeEditorBackgroundColor }}>
                  <CodeHighlighter
                    hljsStyle={atomOneDarkReasonable}
                    language={language}
                    customStyle={{
                      padding: 20,
                      borderRadius: 8,
                      backgroundColor: '#282c34',
                    }}
                  >
                    {part.trim()}
                  </CodeHighlighter>
                </View>
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
    </View>
  );
};

export default CourseModuleTopicContentScreen;
