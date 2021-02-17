// @ts-nocheck

import __SInterface from '../../../interface/SInterface';
import __sugarConfig from '../../../config/sugar';
import __TscInterface from './TscInterface';

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
      type: 'String|Array<String>',
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
      type: 'Boolean|String',
      values: [true, false, 'inline'],
      default: __sugarConfig('ts.compile.map')
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      default: __sugarConfig('ts.compile.prod')
    },
    stripComments: {
      type: 'Boolean',
      default: __sugarConfig('ts.compile.stripComments')
    },
    minify: {
      type: 'Boolean',
      default: __sugarConfig('ts.compile.minify')
    },
    banner: {
      type: 'String',
      default: __sugarConfig('ts.compile.banner')
    },
    save: {
      type: 'Boolean',
      default: __sugarConfig('ts.compile.save')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: __sugarConfig('ts.compile.watch')
    },
    target: {
      type: 'String',
      alias: 't',
      default: __sugarConfig('ts.compile.target')
    },
    transpileOnly: {
      type: 'Boolean',
      default: false
    },
    stacks: {
      type: 'Array<String>',
      alias: 's',
      default: __sugarConfig('ts.compile.stacks')
    },
    tsconfig: {
      type: 'Object',
      default: __sugarConfig('ts.compile.tsconfig')
    }
  };
}
export default STsCompilerParamsInterface;
