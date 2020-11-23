import __isNode from '../is/node';

/**
 * @name                    dataTypesArray
 * @namespace           sugar.js.dev
 * @type                    Array
 * @wip
 *
 * This is just a list of data types available in the
 * current language (node/js)
 *
 * @todo        interface
 * @todo        doc
 * @todo        move this into more appropriate folder
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
if (__isNode()) {
  export default [
    'Number',
    'String',
    'Symbol',
    'Boolean',
    'Null',
    'Undefined',
    'Object',
    'Array',
    'JSON',
    'Function'
  ];
} else {
  export default [
    'Number',
    'String',
    'Symbol',
    'Boolean',
    'Null',
    'Undefined',
    'Object',
    'Array',
    'JSON',
    'Function'
  ];
}
