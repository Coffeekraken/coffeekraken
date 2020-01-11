const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const __execSh = require('exec-sh');

module.exports = () => {

  __log(`Executing the documentation generation...`, 'info');

  try {
    __execSh(`coffeekraken-docblock-to-markdown -f '${__config.doc.filesPattern}' -d '${__config.doc.outputFolder}'`);
  } catch (e) {
    if (e) {
      __log(e, 'error');
      process.exit();
    }
  }

  __log(`The documentation generation has been made successfully.`, 'success');

};
