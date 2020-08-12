const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __getExtendsStack = require('../class/getExtendsStack');

/**
 * @name            SProcess
 * @namespace       node.process
 * @type            Class
 * @extends         SPromise
 * @implements      SProcessInterface
 *
 * This class represent a process in the sugar toolkit
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcess extends __SPromise {
  /**
   * @name          state
   * @type          String
   * @values        idle, running, error, success, watching
   *
   * Store the process state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  state = 'idle';

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(null, {
      id: 'process.unnamed',
      name: 'Unnamed Process',
      ...settings
    }).start();
  }
}

// const cls =
// console.log(Object.getPrototypeOf(cls).name);
// console.log(__getExtendsStack(cls));

// console.log(cls);
// console.log(SProcess);

module.exports = __SProcessInterface.implements(SProcess, __SProcessInterface, {
  title: 'SProcess class implementation',
  description:
    'Something in your class that extends the SProcess one does not match the minimal requirements...'
});
// module.exports = SProcess;
