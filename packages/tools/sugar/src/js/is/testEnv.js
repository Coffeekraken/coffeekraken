// @ts-nocheck
// @shared
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
function isTestEnv() {
    return (__env('NODE_ENV') === 'test' ||
        __env('JEST_WORKER_ID') !== undefined ||
        typeof global.it === 'function');
}
export default isTestEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3RFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLEtBQUssTUFBTSxhQUFhLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sQ0FDTCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssTUFBTTtRQUM1QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxTQUFTO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQ2hDLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==