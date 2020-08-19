/**
 * @name                hasExitCleanup
 * @namespace           node.process
 * @type                Function
 *
 * This function return simply if the exit cleanup process using the "node.process.hasExitCleanup" function has been inited
 *
 * @return      {Boolean}             true if the exit cleanup has been registered, false if not
 *
 * @example         js
 * const hasExitCleanup = require('@coffeekraken/sugar/node/process/hasExitCleanup');
 * const exitCleanup = require('@coffeekraken/sugar/node/process/exitCleanup');
 * hasExitCleanup(); // => false;
 * exitCleanup();
 * hasExitCleanup(); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function hasExitCleanup() {
  return process.env.EXIT_CLEANUP !== undefined
    ? process.env.EXIT_CLEANUP
    : false;
};
