import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __vitePluginSvelte from '@sveltejs/vite-plugin-svelte';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __sVitePluginRiotjs from '@coffeekraken/s-vite-plugin-riotjs';

export default {
  root: '[config.storage.rootDir]',
  base: '/',
  mode: 'development',
  plugins: [
    __vitePluginSvelte(__sugarConfig('svelte')),
    __sVitePluginRiotjs(__sugarConfig('riotjs'))
  ],
  publicDir: '[config.storage.distDir]',
  cacheDir: '[config.storage.cacheDir]/vite',
  clearScreen: false,
  build: {
    lib: {
      entry: '[config.storage.srcDir]/js/index.ts',
      name: 'index'
    },
    outDir: '[config.storage.distDir]/js'
  },
  server: {
    host: __ipAddress(),
    port: 3000,
    hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
    proxy: {}
  },
  css: {},
  rewrites: [
    {
      match: /handlebars\.js/,
      rewrite(src, id) {
        return src.replace(
          'if (global.Symbol && context[global.Symbol.iterator])',
          'if (false)'
        );
      }
    }
  ]
};
