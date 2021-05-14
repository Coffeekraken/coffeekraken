import __sugarConfig from '@coffeekraken/s-sugar-config';
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
      default: 
    }
    bundle: {
      type: 'Boolean',
      default: false,
      alias: 'b'
    },
    target: {
      type: 'String',
      values: ['modules', 'esnext', 'es2015', 'es2016', 'es2020']
    },
    lib: {
      type: 'Boolean',
      default: false,
      alias: 'l'
    },
    prod: {
      type: 'Boolean',
      default: false,
      alias: 'p'
    },
    chunks: {
      type: 'Boolean',
      default: false,
      alias: 'c'
    }
  };
}

export default SViteBuildInterface;
