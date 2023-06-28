// import __SSugarConfig from '@coffeekraken/s-sugar-config';
// import __sVitePostcssPlugin from '@coffeekraken/s-vite-postcss-plugin';
// import __sViteSugarPlugin from '@coffeekraken/s-vite-sugar-plugin';
import * as __vite from 'vite';

// await __SSugarConfig.load();

const plugins = [];

// build the init script
await __vite.build({
    plugins,
    build: {
        minify: true,
        outDir: 'dist/cdn',
        lib: {
            entry: ['src/js/SFrontendChecker.ts'],
            name: 'SFrontendChecker',
            fileName: 'SFrontendChecker',
            formats: ['iife'],
        },
    },
});

process.exit(0);
