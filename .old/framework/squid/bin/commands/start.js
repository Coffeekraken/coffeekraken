const __log = require('@coffeekraken/sugar/node/log/log');
const __execSh = require('exec-sh');
const __path = require('path');
const __forever = require('forever');
// const { killPortProcess } = require('kill-port-process');
const __killPort = require('kill-port');
const __config = require('../../src/node/config');

module.exports = async (env = 'dev') => {

  switch(env) {
    case 'squid':
      try {

        const config = __config();

        __log(`Make sure theirs no processes left running on port ${await config.server.port || 8080}...`, 'info');
        await __killPort(config.server.port || 8080, 'tcp');

        __execSh('node ' + __dirname + '/../../app.js');

        // __forever.start(`app.js`, {
        //   "uid": "app1",
        //   "append": true,
        //   "watch": true,
        //   "script": `app.js`,
        //   "sourceDir": `${__dirname}/../..`
        // });
        // require('../../app.js');
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
