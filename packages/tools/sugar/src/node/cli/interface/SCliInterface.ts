// @ts-nocheck

import __SInterface from '../../class/SInterface';
import __SProcessManagerInterface from '../../process/SProcessManager';

/**
 * @name                SCliInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput ```log``` method.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SCliInterface extends __SInterface {
  static definition = {
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
