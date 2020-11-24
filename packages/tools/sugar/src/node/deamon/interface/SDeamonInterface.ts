// @ts-nocheck

import __SInterface from '../../class/SInterface';

/**
 * @name                SDeamonInterface
 * @namespace           sugar.node.deamon.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element that is capable of "watching" some events/actions, and respond
 * to it by launching function, or whatever you want.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SDeamonInterface extends __SInterface {
  static extendsArray = ['SPromise'];
  static definitionObj = {
    logs: {
      type: 'Object',
      required: true
    },
    watch: {
      type: 'Function',
      required: true
    },
    state: {
      type: 'String',
      required: true,
      values: ['idle', 'watching', 'error']
    }
  };
}
