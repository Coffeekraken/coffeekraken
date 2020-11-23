import __env from '../core/env';

/**
 * @name          testEnv
 * @namespace     sugar.js.is
 * @type          Function
 * @stable
 *
 * Check if the current environment is in a test process or not
 *
 * @return      {Boolean}         true if in environment environment, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isTest from '@coffeekraken/sugar/js/is/testEnv';
 * isTest(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isTestEnv() {
  return (
    __env('NODE_ENV') === 'test' ||
    __env('JEST_WORKER_ID') !== undefined ||
    typeof global.it === 'function'
  );
}
