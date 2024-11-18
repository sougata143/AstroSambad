/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Theme } from './Theme';

export const Colors = {
  light: {
    text: Theme.colors.text.light,
    background: Theme.colors.background.light,
    tint: Theme.colors.primary,
    icon: Theme.colors.text.muted.light,
    tabIconDefault: Theme.colors.text.muted.light,
    tabIconSelected: Theme.colors.primary,
  },
  dark: {
    text: Theme.colors.text.dark,
    background: Theme.colors.background.dark,
    tint: Theme.colors.background.light,
    icon: Theme.colors.text.muted.dark,
    tabIconDefault: Theme.colors.text.muted.dark,
    tabIconSelected: Theme.colors.background.light,
  },
};
