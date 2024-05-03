import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    babel({
      babelrc: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-async-to-generator'],
      },
    }),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  esbuild: {
    // Configure the ES module type
    target: 'esnext'
  }
})
