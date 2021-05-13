import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __sveltePlugin from '@sveltejs/vite-plugin-svelte';

export default {
  root: '[config.storage.rootDir]',
  base: '/',
  mode: 'development',
  plugins: [__sveltePlugin(__sugarConfig('svelte'))],
  publicDir: '[config.storage.distDir]',
  cacheDir: '[config.storage.cacheDir]/vite',
  clearScreen: false,
  build: {
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
