"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SWatch_1 = __importDefault(require("./SWatch"));
/**
 * @name                      watch
 * @namespace           sugar.js.object
 * @type                      Function
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @param       {Object}          [settings={}]       A settings object to configure your watch process. Check the SWatch class documentation for more.
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function watch(target, settings = {}) {
    const watchedObj = new SWatch_1.default(target, settings);
    return watchedObj;
}
exports.default = watch;
