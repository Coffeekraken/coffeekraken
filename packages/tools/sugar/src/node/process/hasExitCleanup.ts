// @ts-nocheck

/**
 * @name                hasExitCleanup
 * @namespace           sugar.node.process
 * @type                Function
 * @status              wip
 *
 * This function return simply if the exit cleanup process using the "node.process.hasExitCleanup" function has been inited
 *
 * @return      {Boolean}             true if the exit cleanup has been registered, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import hasExitCleanup from '@coffeekraken/sugar/node/process/hasExitCleanup';
 * import exitCleanup from '@coffeekraken/sugar/node/process/exitCleanup';
 * hasExitCleanup(); // => false;
 * exitCleanup();
 * hasExitCleanup(); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hasExitCleanup() {
  return process.env.EXIT_CLEANUP !== undefined
    ? process.env.EXIT_CLEANUP
    : false;
}
export = hasExitCleanup;
