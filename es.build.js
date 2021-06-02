const esbuild = require('esbuild');
const resolve = require('path').resolve;

esbuild.build({
    charset: 'utf8',
    color: true,
    entryPoints: [resolve(__dirname, './src/index.ts')],
    outdir: 'build',
    platform: 'browser',
    keepNames: false,
    bundle: true,
    splitting: true,
    target: ['esnext'],
    format: 'esm',
    minify: true,
    sourcemap: 'external'
}).catch(() => process.exit(1));