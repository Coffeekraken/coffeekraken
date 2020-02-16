/**
 * @name                        filter
 * @namespace                   sugar.js.object
 * @type                        Function
 *
 * Allow to filter an object using a function. It works the same as the filter method on the Array object type.
 * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
 * passed property in the filtered object
 *
 * @param               {Object}                object                The object to filter
 * @param               {Function}              filter                The filter function
 * @return              {Object}                                      The filtered object
 *
 * @example           js
 * import filter from '@coffeekraken/sugar/js/object/filter';
 * filter({
 *    coco: 'hello',
 *    plop: true
 * }, (item) => typeof item === 'string');
 * // { coco: 'hello' }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function filter(object, filter) {

  // init the new object to return
  const result = {};

  // loop on the object keys
  Object.keys(object).forEach((propertyName) => {

    // pass the property in the filter function
    if (filter(object[propertyName])) {

      // add the property in the new object
      result[propertyName] = object[propertyName];

    }

  });

  // return the filtered object
  return result;

}
