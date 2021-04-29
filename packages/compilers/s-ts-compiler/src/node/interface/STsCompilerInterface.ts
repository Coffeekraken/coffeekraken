// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

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
    input: {
      type: 'Array<String>',
      path: {
        absolute: true,
        glob: 'resolve'
      },
      alias: 'i',
      default: __sugarConfig('ts.compile.input')
    },
    inDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      alias: 'o',
      default: __sugarConfig('ts.compile.inDir')
    },
    outDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true,
        create: true
      },
      alias: 'o',
      default: __sugarConfig('ts.compile.outDir')
    },
    rootDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      alias: 'r',
      default: __sugarConfig('ts.compile.rootDir')
    },
    clear: {
      type: 'Boolean',
      description:
        'Specify if you want to clear the "outDir" before compiling the new files. Works only if "outDir" is specified',
      default: false
    },
    map: {
      type: 'String|Boolean',
      alias: 'm',
      values: [true, false, 'inline'],
      default: __sugarConfig('ts.compile.map')
    },
    stack: {
      type: 'Array<String>',
      alias: 's',
      default: __sugarConfig('ts.compile.stack')
    },
    config: {
      type: 'String',
      alias: 'c',
      description:
        'Specify either a full tsconfig file path to use as config, or a pre-build config name like "js", "node", etc...',
      default: __sugarConfig('ts.compile.config')
    },
    banner: {
      type: 'String',
      alias: 'b',
      default: __sugarConfig('ts.compile.banner')
    },
    save: {
      type: 'Boolean',
      alias: 's',
      default: __sugarConfig('ts.compile.save')
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
