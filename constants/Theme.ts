export const Theme = {
  colors: {
    primary: '#6366F1',
    secondary: '#EC4899',
    tertiary: '#8B5CF6',
    background: {
      light: '#FFFFFF',
      dark: '#0F172A',
    },
    surface: {
      light: '#F8FAFC',
      dark: '#1E293B',
    },
    text: {
      light: '#1E293B',
      dark: '#F8FAFC',
      muted: {
        light: '#64748B',
        dark: '#94A3B8',
      },
    },
    border: {
      light: '#E2E8F0',
      dark: '#334155',
    },
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    title: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
  },
  shadows: {
    light: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      },
    },
    dark: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
      },
    },
  },
  animation: {
    fast: 200,
    medium: 300,
    slow: 500,
  },
}; 