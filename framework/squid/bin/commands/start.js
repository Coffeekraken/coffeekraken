const __log = require('@coffeekraken/sugar/node/log/log');
const __execSh = require('exec-sh');
const __path = require('path');

module.exports = (env = 'dev') => {

  switch(env) {
    case 'squid':
      try {
        require('../../app.js');
      } catch(error) {
        __log(error, 'error');
        process.exit();
      }
    break;
    case 'prod':
    case 'production':

    break;
    case 'dev':
    case 'development':
    default:
      try {
        __execSh(`${__dirname}/../../node_modules/@coffeekraken/scripts-stack/bin/coffeekraken-scripts-stack start --config ${__path.resolve(__dirname, '../../scripts-stack.config.js')}`)
      } catch(error) {
        __log(error, 'error');
        process.exit();
      }
    break;
  }

}
