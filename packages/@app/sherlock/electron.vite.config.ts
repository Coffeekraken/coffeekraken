// import __postcssSugarPlugin from "@coffeekraken/s-vite-postcss-plugin";
import __postcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
import __autoprefixr from 'autoprefixer';
import __postcssAtroot from 'postcss-atroot';
import __postcssNested from 'postcss-nested';
import __postcssPropertyLookup from 'postcss-property-lookup';

import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        // resolve: {
        //   preserveSymlinks: true,
        //   // extensions: ['.js','']
        // },
        optimizeDeps: {
            exclude: ['@coffeekraken/s-dobby'],
        },
        css: {
            postcss: {
                plugins: [
                    __postcssSugarPlugin(),
                    __postcssAtroot(),
                    // __postcssImport(),
                    __postcssNested(),
                    __postcssPropertyLookup,
                    __autoprefixr(),
                ],
            },
        },
    },
});
