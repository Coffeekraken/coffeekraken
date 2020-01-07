const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const { spawn } = require('child_process');
const __fs = require('fs');
const __path = require('path');

module.exports = () => {

  let configPathsArray = [];
  if (__fs.existsSync(`${__dirname}/../../scripts-stack.config.js`)) {
    configPathsArray.push(`${__dirname}/../../scripts-stack.config.js`);
  }
  if (__fs.existsSync(`${process.cwd()}/scripts-stack.config.js`)) {
    configPathsArray.push(`${process.cwd()}/scripts-stack.config.js`);
  }
  if (__fs.existsSync(`${__config.repositoryRootPath}/scripts-stack.config.js`)) {
    configPathsArray.push(`${__config.repositoryRootPath}/scripts-stack.config.js`);
  }

  try {

    spawn(`${__path.resolve(__dirname + '/../../node_modules/@coffeekraken/scripts-stack/bin/coffeekraken-scripts-stack')} --config ${configPathsArray.join(' ')}`, [], {
      stdio: 'inherit',
      shell: true
    });

  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

}
