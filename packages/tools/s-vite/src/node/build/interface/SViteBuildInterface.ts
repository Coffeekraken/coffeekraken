import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SViteBuildInterface
 * @namespace           s-vite
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SFrontstackViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SViteBuildInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String',
      path: {
        absolute: true
      }
    },
    type: {
      type: 'String',
      values: ['lib', 'bundle', 'module'],
      default: 'module',
      alias: 't'
    },
    target: {
      type: 'String',
      values: ['modules', 'esnext', 'es2015', 'es2016', 'es2020'],
      default: undefined
    },
    watch: {
      type: 'Boolean',
      default: false,
      alias: 'w'
    },
    noWrite: {
      type: 'Boolean',
      default: false
    },
    prod: {
      type: 'Boolean',
      default: false,
      alias: 'p'
    },
    bundle: {
      type: 'Boolean',
      default: false,
      alias: 'b'
    },
    lib: {
      type: 'Boolean',
      default: false,
      alias: 'l'
    },
    chunks: {
      type: 'Boolean',
      default: false,
      alias: 'c'
    }
  };
}

export default SViteBuildInterface;
