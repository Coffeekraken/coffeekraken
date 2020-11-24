// @ts-nocheck

import __SInterface from '../../class/SInterface';

/**
 * @name                SOutputSourceInterface
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
export = class SOutputSourceInterface extends __SInterface {
  static definitionObj = {
    on: {
      type: 'Function',
      required: true
    }
  };
}
