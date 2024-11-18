/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { Theme } from '@/constants/Theme';

type ThemeProps = {
  light?: string;
  dark?: string;
};

type ColorName = keyof typeof Theme.colors;

export function useThemeColor(props: ThemeProps, colorName: ColorName) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  // Handle nested color objects
  const color = Theme.colors[colorName];
  if (typeof color === 'object' && color !== null && theme in color) {
    return color[theme as keyof typeof color];
  }

  return color;
}
