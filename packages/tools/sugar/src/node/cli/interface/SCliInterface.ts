import __SInterface from '../../class/SInterface';
import __SProcessManagerInterface from '../../process/SProcessManager';

/**
 * @name                SCliInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput ```log``` method.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SCliInterface extends __SInterface {
  static definitionObj = {
    interface: {
      type: 'SInterface',
      required: true,
      static: true
    },
    processClass: {
      type: 'SProcessManager',
      required: true,
      static: true
    },
    command: {
      type: 'String',
      required: true,
      static: true
    }
  };
};
