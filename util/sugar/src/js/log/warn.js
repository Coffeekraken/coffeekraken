import __SLog from './SLog';

/**
 * @name              warn
 * @namespace           js.warn
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the warn features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import warn from '@coffeekraken/sugar/js/log/warn';
 * warn('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function warn(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new __SLog({});
  }
  return (global || window)._sLogDefaultInstance.warn(message);
}
