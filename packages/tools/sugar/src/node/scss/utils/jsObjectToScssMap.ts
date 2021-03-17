// @ts-nocheck

import __copy from '../../clipboard/copy';
import __deepMerge from '../../../shared/object/deepMerge';
import __isPlainObject from '../../../shared/is/plainObject';

/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */

function jsObjectToScssMap(value, settings = {}) {
  settings = __deepMerge(
    {
      quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
    },
    settings
  );

  function _jsObjectToScssMap(value, initialIndentLevel = 0) {
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

            let sassVal = _jsObjectToScssMap(jsVal, indentLevel);

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
        } else if (Array.isArray(value)) {
          let sassVals = [];
          value.forEach((v) => {
            if (isNotUndefined(v)) {
              sassVals.push(_jsObjectToScssMap(v, indentLevel));
            }
          });
          return '(' + sassVals.join(', ') + ')';
        } else if (isNull(value)) return 'null';
        else {
          return value.toString();
        }
      default:
        return;
    }
  }

  let res = _jsObjectToScssMap(value);
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

export default jsObjectToScssMap;
