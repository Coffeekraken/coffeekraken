import MobileDetect from "mobile-detect";

/**
 * @name        isSamsumgBrowser
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @example    js
 * import isSamsumgBrowser from '@coffeekraken/sugar/js/is/samsungBrowser'
 * if (isSamsumgBrowser()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isSamsumgBrowser() {
  return window.navigator.userAgent.match(/SamsungBrowser/i) !== null;
}
