const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');

module.exports = () => {

  __log(`Executing the documentation generation for the app "${__config.localPackageJson.name || 'unknown'}"...`, 'info');

  const { execSync } = require("child_process");

  try {
    execSync(`${__path.resolve(__dirname + '/../../node_modules/@coffeekraken/docblock-to-markdown/bin/coffeekraken-docblock-to-markdown')} -f '${__config.doc.filesPattern}' -d '${__config.doc.outputFolder}'`, {
      // stdio: "inherit"
    });
  } catch (e) {
    if (e) {
      __log(e, 'error');
      process.exit();
    }
  }

  __log(`The documentation generation has been made successfully for the app "${__config.localPackageJson.name || 'unknown'}".`, 'success');

};
