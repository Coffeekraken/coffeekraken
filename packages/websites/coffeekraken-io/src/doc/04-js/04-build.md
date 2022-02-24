<!--
/**
 * @name            Build
 * @namespace       doc.js
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / JS - Node           /doc/js/build
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# JS build process

The build process is handled by the AMAZING [ViteJS](https://vitejs.dev) package through our `@coffeekraken/s-vite` package.

It has some defaults config that you can check out bellow and you can as well override everything you want using one of the solution described bellow.

## Default configs

Here's basically the default [ViteJS](https://vitejs.dev) configurations setted by Coffeekraken:

```js
export default {
    root: '[config.storage.package.rootDir]',
    base: '/',
    mode: 'development',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    plugins: [],
    publicDir: '[config.storage.src.rootDir]',
    cacheDir: '[config.storage.package.cacheDir]/vite',
    clearScreen: false,
    optimizeDeps: {
        exclude: ['vue'],
    },
    build: {
        // lib is used only when your build "type" is set to "lib"
        lib: {
            entry: '[config.storage.src.rootDir]/js/index.ts',
            name: 'index',
        },
        outDir: '[config.storage.dist.rootDir]/js',
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
        proxy: {
            '/api/config': 'http://localhost:[config.frontendServer.port]',
        },
        disableGlobbing: false,
    },
};
```

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

{{/layout-doc }}
