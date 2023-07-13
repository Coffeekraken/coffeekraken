// import __postcssSugarPlugin from "@coffeekraken/s-vite-postcss-plugin";
import __postcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin'
// import __postcssAtroot from "postcss-atroot";
// import __postcssExtendRule from "postcss-extend-rule";
// import __postcssPropertyLookup from "postcss-property-lookup";
// import __autoPrefixr from "autoprefixer";

import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        // resolve: {
        //   preserveSymlinks: true,
        //   // extensions: ['.js','']
        // },
        optimizeDeps: {
            exclude: ['@coffeekraken/s-dobby']
        },
        css: {
            postcss: {
                plugins: [
                    __postcssSugarPlugin()
                    // __postcssSugarPlugin,
                    // __postcssImport,
                    // __postcssNested
                ]
            }
        }
    }
})
