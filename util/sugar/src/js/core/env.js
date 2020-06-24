import __isNode from '../is/node';
import __get from '../object/get';
import __set from '../object/set';
import __delete from '../object/delete';

/**
 * @name                    env
 * @namespace           js.core
 * @type                    Function
 *
 * This function allows you to access environment variables through the same method in node and javascript
 *
 * @param           {String}          dotPath         The dot path (something.else) to tell which variable you want
 * @param           {Mixed}           [value=null]    The value you want to assign. If null, you will just get the wanted variable back
 * @return          {Mixed}                           The variable value
 *
 * @example         js
 * import env from '@coffeekraken/sugar/js/dev/env';
 * console.log(env('node_env')); // => production
 * env('something.cool', { hello: 'world' });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function env(dotPath, value) {
  if (!__isNode()) {
    if (!window.process) window.process = {};
    if (!window.process.env) window.process.env = {};
  }
  const targetObj = __isNode() ? global.process.env : window.process.env;

  if (value === null) {
    // delete the variable
    __delete(targetObj, dotPath.toUpperCase());
  } else if (value !== undefined) {
    __set(targetObj, dotPath.toUpperCase(), value);
  }
  // return the variable value
  return __get(targetObj, dotPath.toUpperCase());
}
