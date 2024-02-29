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
      blue: colors.blue
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

