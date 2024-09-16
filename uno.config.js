import presetWind from '@unocss/preset-wind'
import extractorSvelte from '@unocss/extractor-svelte'

/** @type {import('@unocss/core').UserConfig<import('@unocss/preset-wind').Theme>} */
export default {
  extractors: [extractorSvelte()],
  presets: [presetWind()],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '16px',
        md: '32px',
        lg: '120px',
        xl: '240px',
        '2xl': '240px'
      }
    },
    colors: {
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
    fontFamily: {
      sans: ['"Source Sans 3"', 'sans-serif'],
      mono: ['"Ubuntu Mono"', 'monospace']
    }
  }
}
