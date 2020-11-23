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
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element used as a command in an SCommandPanel instance.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SAppCommandInterface extends __SInterface {
  // static implementsArray = [__SCliInterface];

  // static definitionObj = {};

  static title = 'SApp Command Interface';
  static description =
    'This interface represent the minimum requirements that MUST have the instances passed in an SApp based application';
}
