// @ts-nocheck
// @shared

import __chalk from 'chalk';
import __deepMap from '../object/deepMap';
import __isMap from '../is/map';
import __isArray from '../is/array';
import __isBoolean from '../is/boolean';
import __isFunction from '../is/function';
import __isJson from '../is/json';
import __isObject from '../is/object';
import __deepMerge from '../object/deepMerge';
import __stringify from '../json/stringify';
import __mapToObj from '../map/mapToObject';
import __highlightJs from 'highlight.js';
import __stringifyObject from 'stringify-object';
import { highlight as __cliHighlight } from 'cli-highlight';

// import __prettyFormat from 'pretty-format';
// import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
// import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';

/**
 * @name        toString
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (false) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * @return    {String}    The resulting string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function fn(value, settings = {}) {
  settings = __deepMerge(
    {
      beautify: false
    },
    settings
  );
  // const DEFAULT_THEME = {
  //   comment: 'gray',
  //   content: 'reset',
  //   prop: 'yellow',
  //   tag: 'cyan',
  //   value: 'green'
  // };
  // return __prettyFormat(value, {
  //   highlight: true,
  //   indent: 4,
  //   plugins: [__reactTestPlugin, __reactElementPlugin],
  //   theme: DEFAULT_THEME
  // });

  // string
  if (typeof value === 'string') return value;
  // null
  if (value === null) return 'null';
  // undefined
  if (value === undefined) return 'undefined';
  // error
  if (value instanceof Error) {
    if (typeof value.toString === 'function') {
      return value.toString();
    }
    return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
  }

  // Map
  if (__isMap(value)) {
    return __stringifyObject(__mapToObj(value));
  }

  // JSON
  if (__isObject(value) || __isArray(value) || __isJson(value)) {
    value = __deepMap(value, (value, prop, fullPath) => {
      if (value instanceof Map) return __mapToObj(value);
      return value;
    });

    const theme = {
      number: __chalk.yellow,
      default: __chalk.white,
      keyword: __chalk.blue,
      regexp: __chalk.red,
      string: __chalk.whiteBright,
      class: __chalk.yellow,
      function: __chalk.yellow,
      comment: __chalk.gray,
      variable: __chalk.red,
      attr: __chalk.green
    };
    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/\uFFFF/g, '\\"');
    prettyString = __cliHighlight(prettyString, { language: 'js', theme });
    return prettyString;
  }
  // boolean
  if (__isBoolean(value)) {
    if (value) return 'true';
    else return 'false';
  }
  // function
  if (__isFunction(value)) {
    return '' + value;
  }
  // stringify
  let returnString = '';
  try {
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e) {
      returnString = value;
    }
  }
  return returnString;
}
export = fn;
