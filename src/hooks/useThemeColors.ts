// src/hooks/useThemeColors.ts
import { useThemeStore } from '@/src/store/useThemeStore';
import { lightColors, darkColors } from '@/src/theme/theme';

export const useThemeColors = () => {
  const theme = useThemeStore((state) => state.theme);
  return theme === 'dark' ? darkColors : lightColors;
};
