// @ts-nocheck

import __SInterface from '../../class/SInterface';
import __sugarConfig from '../../config/sugar';
import __deepMerge from '../../object/deepMerge';

/**
 * @name                STestInterface
 * @namespace           sugar.node.test.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the cli parameters for the
 * test process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class STestInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String',
      alias: 'i',
      description: 'Input files glob pattern',
      required: true,
      level: 1
    },
    watch: {
      type: 'String|Object',
      alias: 'w',
      description: 'Watch files glob pattern or settings object',
      level: 1
    }
  };
};
