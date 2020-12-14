import ITranspileOnly from './interface/ITranspileOnly';
import __isPath from '../../is/path';
import __fs from 'fs';
import * as __ts from 'typescript';

/**
 * @name            transpileOnly
 * @namespace       sugar.node.typescript.compile
 * @type            Function
 * @async
 * @beta
 *
 * This function simply take a file path (or some code directly) and an object representing the "compilerOptions"
 * of your tsconfig.json file and transpile the code in javascript.
 *
 * @param           {String}          source            The source to transpile. Can be some code of a filepath
 * @param           {Object}          [compilerOptions={}]          Some option to pass to the compiler
 * @return          {Promise}                               A promise that will be resolved once the transpile as ended
 *
 * @example             js
 * import transpileOnly from '@coffeekraken/sugar/node/typescript/compile/transpileOnly';
 * await transpileOnly('my/cool/file.ts');
 * // {
 * //       code: '...',
 * //       map: '...'
 * // }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn: ITranspileOnly = function (source, compilerOptions) {
  return new Promise((resolve, reject) => {
    let content = source;
    if (__isPath(source)) {
      content = __fs.readFileSync(source, 'utf8');
    }

    let result = __ts.transpileModule(content, {
      compilerOptions
    });
    console.log('res', result);
    resolve({
      code: result.outputText,
      map: result.sourceMapText
    });
  });
};
export = fn;
