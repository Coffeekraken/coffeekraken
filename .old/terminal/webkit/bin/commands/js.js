const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const __execSh = require('exec-sh');

module.exports = () => {

  __log(`Generating the javascript files...`, 'info');

  try {

    let sourceFolder = __config.dist.js.sourceFolder;
    let outputFolder = __config.dist.js.outputFolder;

    __execSh(`babel ${sourceFolder} -d ${outputFolder} --ignore '${__config.dist.js.ignorePattern}' --config-file '${__path.resolve(__dirname + '/../../babel.config.js')}'`, {
        cwd: process.cwd()
    });

  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

  __log(`The javascript files have been Successfully generated.`, 'success');

}
