import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __sVitePostcssPlugin from '@coffeekraken/s-vite-postcss-plugin';
import __sViteSugarPlugin from '@coffeekraken/s-vite-sugar-plugin';
import * as __vite from 'vite';

await __SSugarConfig.load();

const plugins = [__sVitePostcssPlugin(), __sViteSugarPlugin()];

// build the init script
await __vite.build({
    plugins,
    build: {
        minify: true,
        outDir: 'dist/init',
        lib: {
            entry: ['src/js/init.ts'],
            name: 's-dashboard-init.js',
            fileName: 'init',
            formats: ['es'],
        },
    },
});

// build the lazy script
await __vite.build({
    plugins,
    build: {
        minify: true,
        outDir: 'dist/lazy',
        lib: {
            entry: ['src/js/lazy.ts'],
            name: 's-dashboard-lazy.js',
            fileName: 'lazy',
            formats: ['es'],
        },
    },
});

// // move files
// __fs.renameSync(
//     `${process.cwd()}/dist/init/init.es.js`,
//     `${process.cwd()}/dist/init.js`,
// );
// __fs.renameSync(
//     `${process.cwd()}/dist/lazy/lazy.es.js`,
//     `${process.cwd()}/dist/lazy.js`,
// );
// __fs.rmSync(`${process.cwd()}/dist/init`, {
//     recursive: true,
// });
// __fs.rmSync(`${process.cwd()}/dist/lazy`, {
//     recursive: true,
// });

process.exit(0);
