// @ts-nocheck
import __findUp from '../../fs/findUp';

import ICompileTs, { ICompileTsParams } from './interface/ICompileTs';
import __SPromise from '../../promise/SPromise';

/**
 * @name                compileTs
 * @namespace           sugar.node.typescript.compile
 * @type                Function
 * @async
 *
 * This function allows you to compile some typescript using the native tsc compiler
 *
 * @param       {ICompileTsParams}          params          A parameters object to configure your compilation
 * @return      {SPromise}                                  A promise that will be resolved once the compilation is finished
 *
 * @example             js
 * import compileTs from '@coffeekraken/sugar/node/typescript/compile/compileTs';
 * await compileTs({
 *
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn: ICompileTs = function compileTs(
  params: ICompileTsParams
): Promise<any> {
  return new __SPromise(async (resolve, reject, trigger, cancel) => {
    trigger('log', {
      value: 'Hello world'
    });

    const files = await __findUp('tsconfig.*', {
      stopWhenFound: false
    });
    console.log('CC', files);
  });
};

export = fn;
