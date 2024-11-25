import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'cyan',
      fileName: 'cyan',
    },
  },
  plugins: [dts({
    // Include the cn-dice directory in the entry points
    entryRoot: resolve(__dirname), 
    include: [
      resolve(__dirname, 'src'), 
      resolve(__dirname, 'cn-dice'),
      resolve(__dirname, 'cn-editor')
    ],
    copyDtsFiles: true,
  })],
})