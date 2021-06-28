// @ts-nocheck

/**
 * @name        camelize
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @return        {String}                      The camelized string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function camelize(text) {
  let res = '';
  const reg = /(?:^|[_-\s])(\w)/g;
  res = text.replace(reg, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}
export default camelize;
