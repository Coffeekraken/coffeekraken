const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const __execSh = require('exec-sh');

module.exports = () => {

  __log(`Launch the "@coffeekraken/pre-view" web server to allow you a quick and simple local development workflow...`, 'info');

  try {
    __execSh(`coffeekraken-pre-view' --config ${__path.resolve(__dirname + '/../../pre-view.config.js')}`, {
      // stdio: "inherit"
    });
  } catch (e) {
    if (e) {
      __log(e, 'error');
      process.exit();
    }
  }

  __log(`The @coffeekraken/pre-view process is terminated.`, 'success');

};
