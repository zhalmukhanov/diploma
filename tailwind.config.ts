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
      blue: colors.blue,
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

