
/** @type {import('vite').UserConfig} */
export default {
  root: './src',
  // base: '/html5-canvas-core',
  mode: 'development',
  publicDir: '../asset',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false,
    emptyOutDir: true,
  },
}
