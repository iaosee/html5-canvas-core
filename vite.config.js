
/** @type {import('vite').UserConfig} */
export default {
    root: './src',
    base: '/',
    mode: 'development',
    build: {
        outDir: '../dist',
        sourcemap: false,
        emptyOutDir: true,
    }
}