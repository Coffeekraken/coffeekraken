import __uncamelize from '../string/uncamelize';
import __autoCast from '../string/autoCast';
import __toString from '../string/toString';

/**
 * @name      dataset
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Get or set a value on the passed element with the passed name
 *
 * @param       {HTMLElement}       $elm         The HTMLElement on which to set to value
 * @param       {String}            key         The key to set the data
 * @param       {Mixed}             [value=null]  The value to set
 * @return      {Mixed}                         Return the value wanted or setted
 *
 * @example     js
 * import dataset from '@coffeekraken/sugar/js/dom/dataset';
 * dataset(myCoolElement, 'hello', 'world'); // => 'world';
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function dataset($elm, key, value = null) {
  if (!$elm.getAttribute) return;
  if (!value) {
    const v =
      $elm.dataset[key] || $elm.getAttribute('data-' + __uncamelize(key));
    return __autoCast(v);
  } else {
    // try to set the value
    let dataset = $elm.dataset;
    if (dataset) {
      $elm.dataset[key] = __toString(value);
    } else {
      // set the data through setAttribute
      // cause no support for dataset
      $elm.setAttribute('data-' + __uncamelize(key), __toString(value));
    }
    // return the element
    return $elm;
  }
}
