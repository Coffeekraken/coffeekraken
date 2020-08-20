const __SInterface = require('../../class/SInterface');

/**
 * @name                SProcessDeamonSettingInterface
 * @namespace           node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for the passed "deamon" setting in a process
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SProcessDeamonSettingInterface extends __SInterface {
  static definitionObj = {
    class: {
      type: 'Class',
      required: true,
      description: 'The SDeamon based class to use'
    },
    watchArgs: {
      type: 'Array',
      required: true,
      description:
        'An array of arguments that will be passed to the "watch" method of the deamon'
    },
    processParams: {
      type: 'Function',
      description:
        'An optional function that will take as arguments the initial process params and the data send by the deamon. You then can update the params depending on the data from the deamon and return the new params object to send to the "run" process method'
    }
  };
};
