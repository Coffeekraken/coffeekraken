"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watch;

var _SWatch = _interopRequireDefault(require("./SWatch"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      watch
 * @namespace           js.object
 * @type                      Function
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @param       {String|Array}        globs           A glob or array of glob patterns to tell which propertie(s) you want to watch
 * @param       {Function}            handlerFn       A function that will be called every time an update is made on the target. This function will receive an object as parameter that describe the update
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
 *
 * @example       js
 * import watch from '@coffeekraken/sugar/js/object/watch';
 * let myObj = watch({
 *    hello: 'world'
 * }, '**', (event) => {
 *    // do something when an event appends
 *    console.log(event.action); // => Object.set
 * });
 * myObj.hello = 'plop';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function watch(target, globs, handlerFn, id = (0, _uniqid.default)()) {
  const watchedObj = new _SWatch.default(target);
  (watchedObj.$watch || watchedObj.watch)(globs, handlerFn, id);
  return watchedObj;
}

module.exports = exports.default;