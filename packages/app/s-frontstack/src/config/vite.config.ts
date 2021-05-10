import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __sveltePlugin from '@sveltejs/vite-plugin-svelte';
import __sveltePreprocess from 'svelte-preprocess';

export default {
  root: '[config.storage.rootDir]',
  base: '/',
  mode: 'development',
  plugins: [
    __sveltePlugin({
      compilerOptions: {
        customElement: true,
        format: 'esm'
      },
      preprocess: __sveltePreprocess()
    })
  ],
  publicDir: '[config.storage.distDir]',
  cacheDir: '[config.storage.cacheDir]/vite',
  clearScreen: false,
  server: {
    host: __ipAddress(),
    port: 3000,
    hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
    proxy: {
      // '/': {
      //   target: `http://${__ipAddress()}:8888`,
      //   changeOrigin: true
      // }
      //   '/doc': {
      //     target: `http://${__ipAddress()}:8080`,
      //     changeOrigin: true
      //   }
    }
  },
  css: {}
};
