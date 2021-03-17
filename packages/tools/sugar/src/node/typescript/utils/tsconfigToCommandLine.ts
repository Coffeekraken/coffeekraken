import __TscInterface from '../compile/interface/TscInterface';
import __buildCommandLine from '../../../shared/cli/buildCommandLine';
import __fs from 'fs';
import __path from 'path';
import __deepMerge from '../../../shared/object/deepMerge';
import __folderPath from '../../fs/folderPath';

/**
 * @name        tsconfigToCommandLine
 * @namespace   sugar.node.typescript.utils
 * @type        Function
 *
 * This function simply take a tsconfig file path and
 * transform it into a ```tsc``` command line arguments
 *
 * @param       {String}       tsconfigPath       Pass a tsconfig.json file path
 * @return      {String}                           The tsconfig command line equivalent
 *
 * @example       js
 * import tsconfigToCommandLine from '@coffeekraken/sugar/node/typescript/utils/tsconfigToCommandLine';
 * tsconfigToCommandLine({
 *    compilerOptions: {
 *      target: 'es6',
 *      module: 'commonjs'
 *    }
 * }); // => -t es6 -m commonjs
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function recursiveRequire(tsconfigPath, currentConfig = {}) {
  // check that the file exists
  if (__fs.existsSync(tsconfigPath) !== true) {
    throw `Sorry but the passed tsconfig file path "<yellow>${tsconfigPath}</yellow>" does not exists...`;
  }
  // read the file
  let tsconfigJson = require(tsconfigPath);

  let extendsTsconfigConfigJson = {};

  // check if it extends another file
  if (tsconfigJson.extends !== undefined) {
    const extendsTsconfigPath = __path.resolve(
      __folderPath(tsconfigPath),
      tsconfigJson.extends
    );
    extendsTsconfigConfigJson = recursiveRequire(extendsTsconfigPath);
    tsconfigJson = __deepMerge(extendsTsconfigConfigJson, tsconfigJson);
  }

  return tsconfigJson;
}
const fn = function (tsconfigPath) {
  const params = {};

  // load the file
  const config: any = recursiveRequire(tsconfigPath);

  // compilerOptions
  if (config.compilerOptions !== null) {
    Object.keys(config.compilerOptions).forEach((key) => {
      const value = config.compilerOptions[key];
      if (__TscInterface.definition[key] === undefined) return;
      params[key] = value;
    });
  }

  const cli = __buildCommandLine('[arguments]', params, {
    definition: __TscInterface.definition
  });

  return cli;
};
export default fn;
