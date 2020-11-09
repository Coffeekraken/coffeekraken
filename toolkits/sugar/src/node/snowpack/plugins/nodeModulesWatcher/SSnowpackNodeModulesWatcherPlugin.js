const __chokidar = require('chokidar');
const __packageRoot = require('../../../path/packageRoot');

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
    config(config) {
      //   const watcher = __chokidar.watch(
      //     `${__packageRoot()}/node_modules/**/*.js`,
      //     {
      //       ignored: /(^|[\/\\])\../, // ignore dotfiles
      //       persistent: true
      //     }
      //   );
      //   watcher.on('change', (path) => {
      //     this.markChanged(path);
      //     console.log(`Updated file: ${path.replace(`${__packageRoot()}/`, '')}`);
      //   });
    },
    // onChange({ filePath }) {
    //   console.log('CHANGFED', filePath);
    // }
    async load({ filePath, isDev }) {
      console.log(filePath);
      return filePath;
    }
  };
};
