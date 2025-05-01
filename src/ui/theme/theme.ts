export const generalColors = {
  // Primary colors
  primary: {
    main: '#DC143C',
    light: '#FF6B6B',
    dark: '#8B0000',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#2E8B57',    
    light: '#7FC7AF',   
    dark: '#1A535C',    
    contrastText: '#FFFFFF'
  },
  // Neutral colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  // Semantic colors
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  background: {
    primary: '#F7F7F7',
    secondary: '#F7F7F7'
  }
};

export const mfcColors = {
  // Primary colors
  primary: {
    main: '#E04E39',    // Основной теплый оранжево-красный
    light: '#FF7F5B',   // Мягкий светлый коралловый
    dark: '#A23527',    // Глубокий терракотовый
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#E7205F',    // Яркий фуксиевый
    light: '#FF8FA3',   // Нежный розовый
    dark: '#8A1538',    // Насыщенный бордовый
    contrastText: '#FFFFFF'
  },
  // Neutral colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#fafafa',
      100: '#F8F9FA',   // Снежно-белый
      200: '#F1F3F5',
      300: '#E9ECEF',
      400: '#DEE2E6',
      500: '#ADB5BD',   // Нейтральный серый
      600: '#868E96',
      700: '#495057',
      800: '#343A40',
      900: '#212529' 
    },
  },
  // Semantic colors
  success: {
    main: '#4CAF50',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  error: {
    main: '#D32F2F',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#FFB300',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  background: {
    primary: '#F7F7F7',
    secondary: '#F7F7F7'
  }
};

export const uniColors = {
  // Primary colors
  primary: {
    main: '#2955F4',    // Яркий кобальтовый синий
    light: '#6C8AFF',   // Светлый лавандово-синий
    dark: '#1A3D8F',    // Глубокий ночной синий
    contrastText: '#FFFFFF'
  },
  // Secondary colors
  secondary: {
    main: '#E7205F',    // Энергичный фуксиевый
    light: '#FF7F9E',   // Нежный розовый кварц
    dark: '#8A1538',    // Насыщенное бургунди
    contrastText: '#FFFFFF'
  },
  // Neutral colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#fafafa',
      100: '#F8F9FA',   // Ледяной белый
      200: '#E9ECEF',   
      300: '#DEE2E6',   // Серебристый
      400: '#CED4DA',
      500: '#ADB5BD',   // Стальной серый
      600: '#6C757D',   // Грифельный
      700: '#495057',
      800: '#343A40',   // Угольный
      900: '#212529'    // Глубокий антрацит
    },
  },
  // Semantic colors
  success: {
    main: '#4CAF50',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  error: {
    main: '#EF476F',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#FFC043',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  background: {
    primary: '#F7F7F7',
    secondary: '#F7F7F7'
  }
};

export const typography = {
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    code: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
};

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const zIndex = {
  negative: -1,
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  modal: 999,
  tooltip: 1000,
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  full: '9999px',
};

export const colors = {
  general: generalColors,
  mfc: mfcColors,
  uni: uniColors
}

export const theme = (companyColors?: keyof typeof colors) => ({
  colors: companyColors ? colors[companyColors] : colors.general,
  typography,
  spacing,
  breakpoints,
  shadows,
  zIndex,
  borderRadius,
});

export type Theme = ReturnType<typeof theme>;