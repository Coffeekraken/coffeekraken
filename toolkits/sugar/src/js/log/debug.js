import __SLog from './SLog';

/**
 * @name              debug
 * @namespace           sugar.js.debug
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the debug features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import debug from '@coffeekraken/sugar/js/log/debug';
 * debug('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function debug(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new __SLog({});
  }
  return (global || window)._sLogDefaultInstance.debug(message);
}
