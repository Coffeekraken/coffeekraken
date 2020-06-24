import __SLog from './SLog';

/**
 * @name              error
 * @namespace           js.error
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the error features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import error from '@coffeekraken/sugar/js/log/error';
 * error('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function error(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new __SLog({});
  }
  return (global || window)._sLogDefaultInstance.error(message);
}
