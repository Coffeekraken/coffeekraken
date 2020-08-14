const __SInterface = require('../../class/SInterface');
const __SProcessInterface = require('../../process/SProcess');

/**
 * @name                SDeamonInterface
 * @namespace           node.deamon.interface
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
module.exports = class SDeamonInterface extends __SInterface {
  static definitionObj = {};
};
