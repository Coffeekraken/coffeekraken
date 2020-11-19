const __sugarHeading = require('../../node/ascii/sugarHeading');
const __packageJson = require('../../node/package/json');

module.exports = function (stringArgs = '') {
  console.log(
    __sugarHeading({
      version: __packageJson(__dirname).version
    })
  );
};
