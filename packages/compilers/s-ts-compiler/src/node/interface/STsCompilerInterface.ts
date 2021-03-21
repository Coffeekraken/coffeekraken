// @ts-nocheck

import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __SInterface from '@coffeekraken/sugar/node/interface/SInterface';

/**
 * @name                STsCompilerInterface
 * @namespace           sugar.node.typescript.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a typescript compilation.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompilerInterface extends __SInterface {
  static definition = {
    // ...__TscInterface.definition,
    input: {
      type: 'Array<String>',
      alias: 'i',
      default: __sugarConfig('ts.compile.input')
    },
    outDir: {
      type: 'String',
      alias: 'o',
      default: __sugarConfig('ts.compile.outDir')
    },
    rootDir: {
      type: 'String',
      alias: 'r',
      default: __sugarConfig('ts.compile.rootDir')
    },
    clear: {
      type: 'Boolean',
      description:
        'Specify if you want to clear the "outDir" before compiling the new files. Works only if "outDir" is specified',
      alias: 'c',
      default: false
    },
    map: {
      type: 'String|Boolean',
      alias: 'm',
      values: [true, false, 'inline'],
      default: __sugarConfig('ts.compile.map')
    },
    stack: {
      type: 'String',
      alias: 's',
      default: __sugarConfig('ts.compile.stack')
    },
    banner: {
      type: 'String',
      alias: 'b',
      default: __sugarConfig('ts.compile.banner')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: __sugarConfig('ts.compile.watch')
    },
    compilerOptions: {
      type: 'Object',
      default: __sugarConfig('ts.compile.compilerOptions')
    }
  };
}
export default STsCompilerInterface;
