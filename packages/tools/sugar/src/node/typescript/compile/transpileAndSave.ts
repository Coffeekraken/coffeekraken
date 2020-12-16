import ItranspileAndSave from './interface/ITranspileAndSave';
import __isPath from '../../is/path';
import __fs from 'fs';
import __transpileOnly from './transpileOnly';

/**
 * @name            transpileAndSave
 * @namespace       sugar.node.typescript.compile
 * @type            Function
 * @async
 * @beta
 *
 * This function simply take a file path and an object representing the "compilerOptions"
 * of your tsconfig.json file and transpile the code in javascript. Then it save the file at the same
 * place the source one was founded and replace the extension to .js
 *
 * @param           {String}          filepath            The file path to transpile.
 * @param           {Object}          [compilerOptions={}]          Some option to pass to the compiler
 * @return          {Promise}                               A promise that will be resolved once the transpile as ended
 *
 * @example             js
 * import transpileAndSave from '@coffeekraken/sugar/node/typescript/compile/transpileAndSave';
 * await transpileAndSave('my/cool/file.ts');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn: ItranspileAndSave = function (filepath, compilerOptions) {
  return new Promise(async (resolve, reject) => {
    if (__isPath(filepath) === false || __fs.existsSync(filepath) === false) {
      return reject(
        `You must pass a valid file path in order to transpile and save it. The passed one "<yellow>${filepath}</yellow>" seems to be an invalid path or the file does not exists...`
      );
    }
    const typescriptResult = await __transpileOnly(filepath, compilerOptions);
    if (typescriptResult && typescriptResult.code !== undefined) {
      const newFilePath = filepath.replace(/\.tsx?$/, '.js');
      if (newFilePath === filepath)
        return reject(
          `The file "<yellow>${filepath}</yellow>" cannot be written cause it would override the source one...`
        );
      __fs.writeFileSync(newFilePath, typescriptResult.code);
    }
    if (typescriptResult && typescriptResult.map !== undefined) {
      const newFilePath = filepath.replace(/\.tsx?$/, '.js.map');
      if (newFilePath === filepath)
        return reject(
          `The file "<yellow>${filepath}</yellow>" cannot be written cause it would override the source one...`
        );
      __fs.writeFileSync(newFilePath, typescriptResult.map);
    }
    resolve(typescriptResult);
  }).catch((e) => {});
};
export = fn;
