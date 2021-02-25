// @ts-nocheck
// @shared
import __deepMerge from '../object/deepMerge';
import __get from '../object/get';
import __set from '../object/set';
import __md5 from '../crypt/md5';
import __isPlainObject from '../is/plainObject';
import __deepMap from '../object/deepMap';
import __SConfigAdapter from './adapters/SConfigAdapter';
/**
 * @name                                            config
 * @namespace           sugar.js.config
 * @type                                            Class
 * @status              beta
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are:
 * - For node:
 *  - File system adapter: @coffeekraken/sugar/node/config/adapters/SConfigFsAdapter
 * - For js:
 *  - Localstorage adapter: @coffeekraken/sugar/js/config/adapters/SConfigLsAdapter
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "catch" method that allows to get the saving errors, etc...
 *
 * @example             js
 * import SConfig from '@coffeekraken/sugar/js/config/SConfig';
 * import SConfigLsAdapter from '@coffeekraken/sugar/js/config/adapters/SConfigLsAdapter';
 * const config = new SConfig({
 *   adapters: [
 *    new SConfigLsAdapter()
 *   ]
 * });
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const _SConfigLoadingByAdapter = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFDbEMsT0FBTyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBRWxDLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUMifQ==