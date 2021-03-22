import __deepMap from './deepMap';
import __set from './set';

/**
 * @name                toJson
 * @namespace           sugar.shared.object
 * @type                Function
 *
 * Convert class instances to plain JSON object
 *
 * @param       {Any}           object      The object to convert
 * @return      {Any}                       The converted object
 *
 * @example         js
 * import toJson from '@coffeekraken/sugar/shared/object/toJson';
 * class MyClass {
 *      hello = 'world';
 *      something() {}
 * }
 * toJson(new MyClass()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function toJson(object: any): any {
  const newObj = {};
  __deepMap(
    object,
    ({ value, path }) => {
      __set(newObj, path, value);
      return value;
    },
    {
      privateProps: false,
      classInstances: true
    }
  );
  return newObj;
}
