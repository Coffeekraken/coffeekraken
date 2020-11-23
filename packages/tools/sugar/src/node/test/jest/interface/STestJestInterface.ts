import __SInterface from '../../../class/SInterface';
import __STestInterface from '../../interface/STestInterface';
import __sugarConfig from '../../../config/sugar';
import __deepMerge from '../../../object/deepMerge';

/**
 * @name                STestJestCliInterface
 * @namespace           sugar.node.test.jest.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the cli parameters for the
 * test jest process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class STestJestCliInterface extends __SInterface {
  static definitionObj = __deepMerge(__STestInterface.definitionObj, {
    input: {
      default: __sugarConfig('jest.cli.input')
    },
    watch: {
      default: __sugarConfig('jest.cli.watch')
    }
  });
}
