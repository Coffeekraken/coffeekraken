const __argsToObject = require('../../node/cli/argsToObject');
const __STermAppCli = require('../../node/termapp/STermAppCli');
const __STermApp = require('../../node/termapp/STermApp');
const __deepMerge = require('../../node/object/deepMerge');
const __packageRoot = require('../../node/path/packageRoot');
const __sugarConfig = require('../../node/config/sugar');

module.exports = (stringArgs = '') => {
  const args = __deepMerge(
    __argsToObject(stringArgs, __STermAppCli.interface.definitionObj),
    {
      name: 'sugarapp',
      configFolderPath: `${__packageRoot(__dirname)}/.sugar`
    }
  );
  const app = new __STermApp(args);
};
