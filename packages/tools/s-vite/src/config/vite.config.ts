import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default {
  root: '[config.storage.package.rootDir]',
  base: '/',
  mode: 'development',
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
    // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
    __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
    __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
    __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`)
  ],
  publicDir: '[config.storage.src.rootDir]',
  cacheDir: '[config.storage.package.cacheDir]/vite',
  clearScreen: false,
  optimizeDeps: {
      exclude: [
        'vue'
      ]
    },
  build: {
    lib: {
      entry: '[config.storage.src.rootDir]/js/index.ts',
      name: 'index'
    },
    outDir: '[config.storage.dist.rootDir]/js'
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
    proxy: {},
    disableGlobbing: false
  },
  css: {},
  rewrites: [__path.resolve(`${__dirname()}/../node/rewrites/handlebars`)]
};
