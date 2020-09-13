const __STermAppCli = require('../../node/termapp/STermAppCli');
const __STermApp = require('../../node/termapp/STermApp');
const __argsToObject = require('../../node/cli/argsToObject');

module.exports = (stringArgs = '') => {
  const app = new __STermApp(
    __argsToObject(stringArgs, __STermAppCli.interface.definitionObj)
  );
};
