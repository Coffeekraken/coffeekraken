import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';


export default {
  root: '[config.storage.package.rootDir]',
  base: '/',
  mode: 'development',
  plugins: [
    __path.resolve(`${__dirname}/../node/plugins/sugarPlugin`),
    __path.resolve(`${__dirname}/../node/plugins/sveltePlugin`),
    __path.resolve(`${__dirname}/../node/plugins/riotjsPlugin`),
    __path.resolve(`${__dirname}/../node/plugins/postcssPlugin`),
    __path.resolve(`${__dirname}/../node/plugins/imageminPlugin`)
  ],
  publicDir: '[config.storage.src.rootDir]',
  cacheDir: '[config.storage.package.cacheDir]/vite',
  clearScreen: false,
  build: {
    lib: {
      entry: '[config.storage.src.rootDir]/js/index.ts',
      name: 'index'
    },
    outDir: '[config.storage.dist.rootDir]/js'
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
