// @ts-nocheck

import __sugarConfig from '../../../config/sugar';
import __SInterface from '../../../interface/SInterface';

/**
 * @name                STsCompilerParamsInterface
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
class STsCompilerParamsInterface extends __SInterface {
  static definition = {
    // ...__TscInterface.definition,
    input: {
      type: 'Array<String>',
      alias: 'i',
      default: __sugarConfig('ts.compile.input')
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      default: __sugarConfig('ts.compile.outputDir')
    },
    rootDir: {
      type: 'String',
      default: __sugarConfig('ts.compile.rootDir')
    },
    map: {
      type: 'String|Boolean',
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
export default STsCompilerParamsInterface;
