/**
 * @name                          get
 * @namespace           js.object
 * @type                          Function
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 */
export default (obj, path) => {
  if (obj[path] !== undefined) return obj[path];
  if (!path || path === '' || path === '.') return obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  var a = path.split('.');
  var o = obj;
  while (a.length) {
    var n = a.shift();
    if (typeof o !== 'object') return;
    if (!(n in o)) return;
    o = o[n];
  }
  return o;
};
