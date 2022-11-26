
/** @type {import('vite').UserConfig} */
export default {
  root: './src',
  base: '/',
  mode: 'development',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false,
    emptyOutDir: true,
  },
}
