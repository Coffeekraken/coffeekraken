import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';

export default {
  root: '[config.storage.rootDir]',
  base: '/',
  mode: 'development',
  plugins: [
    __path.resolve(`${__dirname}/../node/plugins/sveltePlugin`),
    __path.resolve(`${__dirname}/../node/plugins/riotjsPlugin`),
    __path.resolve(`${__dirname}/../node/plugins/postcssPlugin`),
    __path.resolve(`${__dirname}/../node/plugins/imageminPlugin`)
  ],
  publicDir: '[config.storage.srcDir]',
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
  rewrites: [__path.resolve(`${__dirname}/../node/rewrites/handlebars`)]
};
