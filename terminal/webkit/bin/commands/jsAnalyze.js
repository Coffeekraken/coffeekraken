const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const __glob = require('glob');
const __execSh = require('exec-sh');

module.exports = () => {

  // searching for .bundle.js files
  const bundleFiles = __glob.sync(__config.dist.js.bundle.sourceFilesPattern, {
    cwd: process.cwd()
  });

  if ( ! bundleFiles.length) {
    __log('No file with name "' + __config.dist.js.bundle.sourceFilesPattern.split('/').slice(-1) + '" has been found...', 'warn');
    return;
  }

  __log(`Generating the javascript bundles...`, 'info');

  try {

    __execSh(`rm -rf ${__config.dist.js.outputFolder} && webpack --config ${__path.resolve(__dirname + '/../../webpack.analyzer.config.js')}`, {
        cwd: process.cwd()
    });

  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

  __log(`The javascript bundles have been successfully generated.`, 'success');

}
