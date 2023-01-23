<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

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

# JS build process

The build process is handled by the AMAZING [ViteJS](https://vitejs.dev) package through our `@coffeekraken/s-vite` package.

It has some defaults config that you can check out bellow and you can as well override everything you want using one of the solution described bellow.

## Default configs

Here's basically the default [ViteJS](https://vitejs.dev) configurations setted by Coffeekraken:

```js
export default {
  root: '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@websites/coffeekraken-io',
  base: '/',
  logLevel: 'error',
  mode: 'development',
  resolve: { dedupe: ['react', 'react-dom'], alias: [] },
  plugins: [
    '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/vite/s-vite/dist/pkg/esm/node/plugins/sugarPlugin',
    '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/vite/s-vite/dist/pkg/esm/node/plugins/postcssPlugin',
    '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/vite/s-vite/dist/pkg/esm/node/plugins/plainTextPlugin',
  ],
  publicDir:
    '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@websites/coffeekraken-io/src/public',
  cacheDir:
    '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@websites/coffeekraken-io/.local/cache/vite',
  clearScreen: false,
  optimizeDeps: {
    entries: ['index.html'],
    esbuildOptions: { resolveExtensions: ['.js', '.ts'] },
  },
  build: {
    outDir:
      '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@websites/coffeekraken-io/dist/js',
    assetsDir: '',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    hostname: 'http://0.0.0.0:3000',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
    proxy: {
      '^\\/dist\\/css\\/(partials|lod)\\/.*\\.css(\\?.*)?

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

: {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
      '^\\/dist\\/.*(\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs)(\\?.*)?

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

: {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '^.*\\.(js(?!on)|css)(?!.map)(?!\\?)(.+){1,99999}

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

: {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
      '^\\/dist\\/(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs).)*(\\?.*)?

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

:
        { target: 'http://127.0.0.1:8080', changeOrigin: true },
      '^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|\\@fs|\\@id|__vite_ping|index.html).)*

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

:
        { target: 'http://127.0.0.1:8080', changeOrigin: true },
    },
  },
  rewrites: [
    '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/vite/s-vite/dist/pkg/esm/node/rewrites/handlebars',
  ],
  test: {
    dir: '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@websites/coffeekraken-io/src',
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: [
      '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/vite/s-vite/dist/pkg/esm/node/test/globalSetup',
    ],
    watchExclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/__tests__.wip/**',
      '**/__wip__/**',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/__tests__.wip/**',
      '**/__wip__/**',
    ],
    deps: { inline: true },
  },
};

```

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.

