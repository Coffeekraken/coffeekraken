// @ts-nocheck

import __SInterface from '../../interface/SInterface';
import __LogInterface from '../../log/interface/LogInterface';

/**
 * @name                SStdioLogInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SStdio ```log``` method.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SStdioLogInterface extends __SInterface {
  static definition = {
    ...__LogInterface.definition,
    clear: {
      type: 'Boolean|Integer',
      description:
        'If set to <yellow>true</yellow>, clear the entire Stdio stream, otherwise you can specify a number of line(s) to clear',
      alias: 'c'
    },
    temp: {
      type: 'Boolean',
      description:
        'Set the log as temporary. This mean that it will dissapear on the next log action',
      alias: 't'
    },
    group: {
      type: 'String',
      description: 'Specify a group in which to display the log',
      alias: 'g'
    },
    mt: {
      type: 'Integer',
      description: 'Specify the margin top to apply',
      default: 0
    },
    mb: {
      type: 'Integer',
      description: 'Specify the margin bottom to apply',
      default: 1
    }
  };
};
