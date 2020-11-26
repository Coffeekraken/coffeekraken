// @ts-nocheck

import __SInterface from '../../class/SInterface';
import __SOutputProcessInterface from './SOutputProcessInterface';
import __SProcessManagerInterface from '../../process/interface/SProcessManagerInterface';
import __SOutputLogInterface from './SOutputLogInterface';
import __SCliInterface from '../../cli/interface/SCliInterface';

/**
 * @name                SAppCommandInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element used as a command in an SCommandPanel instance.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SAppCommandInterface extends __SInterface {
  // static implementsArray = [__SCliInterface];

  // static definition = {};

  static title = 'SApp Command Interface';
  static description =
    'This interface represent the minimum requirements that MUST have the instances passed in an SApp based application';
};
