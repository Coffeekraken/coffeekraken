"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deserialize;

/**
 * @name            deserialize
 * @namespace       js.class
 * @type            Function
 * @async           Is async if you don't pass the ```cls``` parameter
 *
 * This function allows you to deserialize a class instance
 * into a JSON formated string that you can then dedeserialize using
 * the ```js.class.dedeserialize``` function to get your class instance
 * back.
 *
 * @param       {Mixed}         instanceString       The string representation of the class to deserialize
 * @param       {Class}         [cls=null]          The class to use as deserializer. If not specified, will try to get the class import path from the serialized string but for that your base class need to specify the ```static import = '@coffeekraken/...';``` path.
 * @return      {Mixed|Promise}                      If the ```cls``` param is specified, return the deserialized instance directly, otherwise, return a promise resolved once the instance has been deserialized
 *
 * @example       js
 * import deserialize from '@coffeekraken/sugar/js/class/deserialize';
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deserialize(instanceString, cls) {
  const object = JSON.parse(instanceString);
  console.log(cls, cls.constructor, cls.prototype);
  console.log(object);
}

module.exports = exports.default;