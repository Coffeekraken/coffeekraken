"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SWatch_1 = __importDefault(require("./SWatch"));
/**
 * @name                      watch
 * @namespace            shared.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        wip
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @param       {Object}          [settings={}]       A settings object to configure your watch process. Check the SWatch class documentation for more.
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import watch from '@coffeekraken/sugar/js/object/watch';
 * let myObj = watch({
 *    hello: 'world'
 * }).on('*', watchResult => {
 *    // do something...
 * });
 * myObj.hello = 'plop';
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function watch(target, settings = {}) {
    const watchedObj = new SWatch_1.default(target, settings);
    return watchedObj;
}
exports.default = watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxnQkFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=