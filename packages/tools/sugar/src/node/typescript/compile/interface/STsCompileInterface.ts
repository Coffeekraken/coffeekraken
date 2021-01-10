// @ts-nocheck

import __SInterface from '../../../interface/SInterface';
import __sugarConfig from '../../../config/sugar';
import __TscInterface from './TscInterface';

/**
 * @name                STsCompileInterface
 * @namespace           sugar.node.typescript.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
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
export = class STsCompileInterface extends __SInterface {
  static definition = {
    // ...__TscInterface.definition,
    project: {
      type: 'Array<File>',
      alias: 'p'
    },
    stacks: {
      type: 'Array<String>',
      alias: 's'
    },
    input: {
      type: 'String',
      alias: 'i'
    },
    cache: {
      type: 'Boolean',
      default: true
    },
    clearCache: {
      type: 'Boolean',
      default: false
    },
    prod: {
      type: 'Boolean',
      default: false
    },
    stripComments: {
      type: 'Boolean',
      default: false
    },
    tsconfig: {
      type: 'Object',
      default: __sugarConfig('ts')
    },
    transpileOnly: {
      type: 'Boolean'
    }
  };
};
