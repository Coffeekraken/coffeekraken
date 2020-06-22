const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const { execSync } = require('child_process');
const __processPath = require('./processPath');

module.exports = (rootDir) => {

  __log(`Generating the javascript files...`, 'info');

  try {

    let sourceFolder = __processPath(__config.dist.js.sourceFolder);
    let outputFolder = __processPath(__config.dist.js.outputFolder);

    execSync(`${__path.resolve(__dirname + '/../../node_modules/@babel/cli/bin/babel.js')} ${sourceFolder} -d ${outputFolder} --ignore '${__config.dist.js.ignorePattern}' --config-file '${__path.resolve(__dirname + '/../../babel.config.js')}'`, {
        cwd: process.cwd()
    });

  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

  __log(`The javascript files have been Successfully generated.`, 'success');

}
