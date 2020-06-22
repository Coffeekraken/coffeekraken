const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __fs = require('fs');
const __path = require('path');
const __execSh = require('exec-sh');

module.exports = () => {

  let configPathsArray = [];
  if (__fs.existsSync(`${__dirname}/../../scripts-stack.config.js`)) {
    configPathsArray.push(`${__dirname}/../../scripts-stack.config.js`);
  }
  if (__fs.existsSync(`${process.cwd()}/scripts-stack.config.js`)) {
    configPathsArray.push(`${process.cwd()}/scripts-stack.config.js`);
  }

  try {

    __execSh(`coffeekraken-scripts-stack --config ${configPathsArray.join(' ')}`);

  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

}
