// @ts-nocheck

import __copy from '../clipboard/copy';
import __deepMerge from '../object/deepMerge';
import __isPlainObject from '../is/plainObject';
let { isArray } = Array;

/**
 * @wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */

function jsToScssString(value, settings = {}) {
  settings = __deepMerge(
    {
      quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
    },
    settings
  );

  function _jsToScssString(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        if (value.slice(0, 1) === '#') {
          return `"${value}"`;
        }
        return value;
      case 'object':
        if (__isPlainObject(value)) {
          indentLevel += 1;
          let indent = indentsToSpaces(indentLevel);

          let jsObj = value;
          let sassKeyValPairs = [];

          sassKeyValPairs = Object.keys(jsObj).reduce((result, key) => {
            let jsVal = jsObj[key];

            let sassVal = _jsToScssString(jsVal, indentLevel);

            if (isNotUndefined(sassVal)) {
              if (settings.quoteKeys.indexOf(key) !== -1) {
                result.push(`${key}: "${sassVal}"`);
              } else {
                result.push(`${key}: ${sassVal}`);
              }
            }

            return result;
          }, []);

          let result = `(\n${
            indent + sassKeyValPairs.join(',\n' + indent)
          }\n${indentsToSpaces(indentLevel - 1)})`;
          indentLevel -= 1;
          return result;
        } else if (isArray(value)) {
          let sassVals = [];
          for (v of value) {
            if (isNotUndefined(v)) {
              sassVals.push(_jsToScssString(v, indentLevel));
            }
          }
          return '(' + sassVals.join(', ') + ')';
        } else if (isNull(value)) return 'null';
        else {
          console.log('sOM', typeof value);
          return value.toString();
        }
      default:
        return;
    }
  }

  let res = _jsToScssString(value);
  res = res.replace(/\s["'](#[a-zA-Z0-9]{3,6})["']/gm, ' $1');
  return res;
}

function indentsToSpaces(indentCount) {
  return Array(indentCount + 1).join('  ');
}

function isNull(value) {
  return value === null;
}

function isNotUndefined(value) {
  return typeof value !== 'undefined';
}

export = jsToScssString;
