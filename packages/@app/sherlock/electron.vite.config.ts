// import __sugarcssPlugin from "@coffeekraken/s-vite-postcss-plugin";
import __sugarcssPlugin from '@coffeekraken/s-sugarcss-plugin';
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
                    __sugarcssPlugin(),
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
