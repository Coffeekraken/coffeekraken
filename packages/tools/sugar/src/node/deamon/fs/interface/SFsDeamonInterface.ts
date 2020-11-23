import __SInterface from '../../../class/SInterface';
import __SDeamonInterface from '../../interface/SDeamonInterface';

/**
 * @name                SFsDeamonInterface
 * @namespace           sugar.node.deamon.fs.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element that is capable of "watching" some events/actions, and respond
 * to it by launching function, or whatever you want.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFsDeamonInterface extends __SInterface {
  static implementsArray = [__SDeamonInterface];

  static definitionObj = {
    watch: {
      type: 'String',
      alias: 'i',
      description: 'Specify what to watch using a glob pattern',
      required: true,
      level: 1
    }
  };
}
