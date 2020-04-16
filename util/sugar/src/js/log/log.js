import __SLog from './SLog';

/**
 * @name              log
 * @namespace         sugar.js.log
 * @type              Function
 * 
 * This function is a simple wrapper around the SLog class that let you use the log features quickly
 * 
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 * 
 * @example         js
 * import log from '@coffeekraken/sugar/js/log/log';
 * log('Hello world');
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function log(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new __SLog({});
  }
  return (global || window)._sLogDefaultInstance.log(message);
}