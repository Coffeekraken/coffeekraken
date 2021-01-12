// @ts-nocheck

import __SInterface from '../../../interface/SInterface';
import __sugarConfig from '../../../config/sugar';
import __TscInterface from './TscInterface';
import __packageRoot from '../../../path/packageRoot';

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
    input: {
      type: 'String|Array<String>',
      alias: 'i',
      default: `${__packageRoot()}/tsconfig.json`
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
      type: 'Boolean',
      default: false
    },
    watch: {
      type: 'Boolean',
      default: false
    }
  };
};
