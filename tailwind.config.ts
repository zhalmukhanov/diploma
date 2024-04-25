import type { Config } from 'tailwindcss'
import tailwindcss from 'tailwindcss'
import colors = require("tailwindcss/colors");

export default {
  content: [
    './src/domains/**/*.{vue,js,ts,jsx,tsx}',
    './src/shared/ui/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FAFAFA',
      black: '#030712',
      blue: {
        50: '#E3F2FF',
        100: '#C5E4FB',
        200: '#A2D4F8',
        300: '#7AC1F4',
        400: '#47A7EF',
        500: '#007AE8',
        600: '#0063C7',
        700: '#1D4E8D',
        800: '#003C7E',
        900: '#002855',
      },
      gray: colors.gray,
      success: '#4ADE80'
    },
    extend: {},
  },
  plugins: [],
  css: {
    postcss: {
      plugins: [
          tailwindcss()
      ],
    },
  }
} satisfies Config

