const __chokidar = require('chokidar');
const __packageRoot = require('../../../path/packageRoot');
const __childProcess = require('child_process');
const __path = require('path');

let INSTALL_TIMEOUT;

module.exports = function SSnowpackNodeModulesWatcherPlugin(
  snowpackConfig,
  pluginOptions = {}
) {
  return {
    name: 'SSnowpackNodeModulesWatcherPlugin',
    resolve: {
      input: ['.js'],
      output: ['.js']
    },
    async load({ filePath }) {
      console.log(filePath);
    }
    // config(config) {
    //   const watcher = __chokidar.watch(
    //     [
    //       `${__packageRoot()}/node_modules/@coffeekraken/sugar/js/**/*.js`,
    //       `${__packageRoot()}/node_modules/@coffeekraken/sugar/node/**/*.js`
    //     ],
    //     {
    //       ignored: /(^|[\/\\])\../, // ignore dotfiles
    //       persistent: true
    //     }
    //   );
    //   watcher.on('change', (path) => {
    //     const parts = path.split('@coffeekraken/');
    //     path =
    //       '@coffeekraken/' + parts.pop().replace('.js', '').replace('/src', '');

    //     console.log(`Mark changed: ${path}`);
    //     clearTimeout(INSTALL_TIMEOUT);
    //     INSTALL_TIMEOUT = setTimeout(() => {
    //       __childProcess.spawn(
    //         `snowpack install --config ${__path.resolve(
    //           __packageRoot(),
    //           '../sugar/snowpack.config.js'
    //         )} --polyfill-node`,
    //         [],
    //         {
    //           cwd: __packageRoot(),
    //           env: {
    //             ...process.env,
    //             SNOWPACK_IS_INSTALL: true
    //           },
    //           stdio: 'inherit',
    //           shell: true
    //         }
    //       );
    //     }, 200);
    //     // this.markChanged(
    //     //   '/web_modules/@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent.js'
    //     // );
    //     // this.markChanged(
    //     //   '/web_modules/@coffeekraken/sugar/js/webcomponent/SWebComponent.js'
    //     // );
    //     // this.markChanged(`${path}`);
    //     // this.markChanged(`./${path}.js`);
    //   });
    // }
    // onChange({ filePath }) {
    //   console.log('CHANGFED', filePath);
    // }
    // async load({ filePath, isDev }) {
    //   console.log(filePath);
    //   return filePath;
    // }
  };
};
