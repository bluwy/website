import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'media',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '16px',
        md: '32px',
        lg: '120px',
        xl: '240px'
      }
    },
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      primary: {
        100: '#fff1f8',
        200: '#ffe4f1',
        300: '#ffd6eb',
        400: '#ffc9e4',
        500: '#ffbbdd',
        600: '#e6a8c7',
        700: '#ba7b9a',
        800: '#a95a81',
        900: '#874867'
      },
      warning: {
        100: '#fff7dc',
        200: '#ffefb9',
        300: '#ffe696',
        400: '#ffde73',
        500: '#ffd650',
        600: '#e6c148',
        700: '#b39638',
        800: '#806b28',
        900: '#4c4018'
      }
    },
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
        mono: ['"Ubuntu Mono"', 'monospace']
      },
      borderWidth: {
        6: '6px',
        10: '10px',
        12: '12px'
      }
    }
  }
})
