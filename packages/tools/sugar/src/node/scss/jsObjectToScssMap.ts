const __copy = require('../clipboard/copy');
// const __jsonSass = require('json-sass-vars');
// module.exports = function jsObjectToScssMap(object, settings = {}) {
//   settings = __deepMerge(
//     {
//       quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
//     },
//     settings
//   );

//   const jsObject = object;

//   let scssConfigString = __jsonSass.convertJs(jsObject);

//   console.log(scssConfigString);
//   throw 'coco';

//   scssConfigString = `${scssConfigString}`;

//   scssConfigString.split('\n').forEach((line) => {
//     line = line.trim();
//     const isComma = line.substr(-1) === ',';
//     if (isComma) {
//       line = line.slice(0, -1);
//     }
//     const prop = line.split(':')[0];
//     let value = line.split(':').slice(1).join(':').trim();

//     if (value.slice(0, 1) === '#') {
//       console.log(line);
//       console.log(prop, value);
//     }

//     if (prop === '),' || prop === ')' || value === '(') return;

//     // process arrays
//     const arrayReg = /^\((.*)\),?/;
//     const arrayMatches = value.match(arrayReg);
//     if (arrayMatches) {
//       const res = arrayMatches[1]
//         .split(',')
//         .map((val) => {
//           return `'${val.trim()}'`;
//         })
//         .join(', ');
//       value = value.replace(arrayMatches[1], res);
//       scssConfigString = scssConfigString.replace(line, `${prop}: ${value}`);
//       return;
//     }
//     if (
//       settings.quoteKeys.indexOf(prop) === -1
//       // && value.split(' ').length === 1
//     )
//       return;
//     scssConfigString = scssConfigString.replace(line, `${prop}: "${value}"`);
//   });

//   // set or append in the "data" property
//   return scssConfigString;
// };

const __deepMerge = require('../object/deepMerge');
const __isPlainObject = require('../is/plainObject');
let { isArray } = Array;

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

module.exports = jsToScssString;
