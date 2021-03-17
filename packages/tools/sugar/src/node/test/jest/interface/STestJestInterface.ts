// @ts-nocheck

import __SInterface from '../../../../shared/class/SInterface';
import __STestInterface from '../../../shared/interface/STestInterface';
import __sugarConfig from '../../../config/sugar';
import __deepMerge from '../../../../shared/object/deepMerge';

/**
 * @name                STestJestCliInterface
 * @namespace           sugar.node.test.jest.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the cli parameters for the
 * test jest process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class STestJestCliInterface extends __SInterface {
  static definition = __deepMerge(__STestInterface.definition, {
    input: {
      default: __sugarConfig('jest.cli.input')
    },
    watch: {
      default: __sugarConfig('jest.cli.watch')
    }
  });
}
