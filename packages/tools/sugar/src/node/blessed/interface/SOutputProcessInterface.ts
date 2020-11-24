// @ts-nocheck

import __SInterface from '../../class/SInterface';

/**
 * @name                SOutputProcessInterface
 * @namespace           sugar.node.blessed
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput class constructor.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SOutputProcessInterface extends __SInterface {
  static definitionObj = {
    on: {
      type: 'Function',
      required: true
    }
  };
}
