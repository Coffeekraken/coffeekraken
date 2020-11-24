// @ts-nocheck

import __SInterface from '../../class/SInterface';

/**
 * @name                SProcessManagerInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SProcessManagerInterface extends __SInterface {
  // static extendsArray = ['SProcess', 'SPromise'];
  static definitionObj = {
    run: {
      type: 'Function',
      required: true
    },
    kill: {
      type: 'Function',
      required: true
    }
  };

  static title = 'SProcess elements Interface';
  static description =
    'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit';
}
