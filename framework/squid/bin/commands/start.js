const __log = require('@coffeekraken/sugar/node/log/log');

module.exports = () => {

  try {
    require('../../app.js');
  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

}
