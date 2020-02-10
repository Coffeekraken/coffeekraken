"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parse = _interopRequireDefault(require("./parse"));

var _unquote = _interopRequireDefault(require("./unquote"));

var _upperFirst = _interopRequireDefault(require("./upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                        parseArgs
 * @namespace                   sugar.js.string
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    arguments                   The arguments object description
 * @return            {Object}                                                The object of funded arguments
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 --help "coco yep" #blop', {
 *    action: 'String -a --action /^\\S$/',
 *    world: 'Integer -w --world',
 *    help: 'String -h --help',
 *    id: 'String -i --id /^#([\\S]+)$/',
 *    yop: 'String -y --yop "Default value"'
 * });
 * // {
 * //   action: 'hello',
 * //   world: 10,
 * //   help: 'coco yep',
 * //   id: 'blop',
 * //   yop: 'Default value'
 * // }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const availableTypes = ['number', 'bigint', 'string', 'boolean', 'null', 'undefined', 'object', 'symbol', 'function', 'object', 'array'];

function parseArgsString(string, arg) {
  string = string.split(' ');
  string = string.filter(s => {
    if (s.trim() === '') return false;
    return true;
  });
  const argObj = {};
  string.forEach(s => {
    if (availableTypes.indexOf(s.toLowerCase()) !== -1) {
      argObj.types = s.trim().split(',');
    } else if (s.trim().slice(0, 2) === '--') {
      argObj.bigName = s.trim().slice(2);
    } else if (s.trim().slice(0, 1) === '-') {
      argObj.smallName = s.trim().slice(1);
    } else if (s.trim().slice(0, 1) === '/' && s.trim().slice(-1) === '/') {
      argObj.regex = s.trim();
    } else if (s.trim().slice(0, 1) === '"' && s.trim().slice(-1) === '"') {
      argObj.default = s.trim().slice(1, -1).split(',');
      argObj.default = argObj.default.map(v => {
        return (0, _parse.default)(v);
      });

      if (argObj.default.length <= 1) {
        argObj.default = argObj.default[0];
      }
    }
  }); // check the "default" value depending on the alloewd types

  if (argObj.default !== undefined) {
    if (Array.isArray(argObj.default) && argObj.types.indexOf('Array') !== -1) {} else if (argObj.types.indexOf((0, _upperFirst.default)(typeof argObj.default)) === -1) {
      throw new Error(`The "default" value setted to "${argObj.default}" for the argument "${arg}" is of type "${(0, _upperFirst.default)(typeof argObj.default)}" and does not fit with the allowed types which are "${argObj.types.join(',')}"...`);
    }
  }

  return argObj;
}

var _default = (string, args) => {
  if (!string) return;
  let argsObj = Object.assign(args); // handle the "alone" atruments that mean boolean true

  const aloneSmallArgs = string.match(/\s(-[a-zA-Z])\s-/g);
  const lastAloneSmallArgs = string.match(/\s(-[a-zA-Z])\s?$/g);
  const aloneBigArgs = string.match(/\s(--[a-zA-Z-]+)\s-/g);
  const lastAloneBigArgs = string.match(/\s(--[a-zA-Z-]+)\s?$/g);

  if (aloneSmallArgs) {
    aloneSmallArgs.forEach(arg => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true -`);
    });
  }

  if (lastAloneSmallArgs) {
    lastAloneSmallArgs.forEach(arg => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true `);
    });
  }

  if (aloneBigArgs) {
    aloneBigArgs.forEach(arg => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true -`);
    });
  }

  if (lastAloneBigArgs) {
    lastAloneBigArgs.forEach(arg => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true `);
    });
  }

  string = ' ' + string + ' ';
  let parts = string.split(/(--?[a-zA-Z-]+)/g);
  parts = parts.map(p => {
    return p.trim();
  });
  parts = parts.filter(p => {
    if (p.trim() === '') return false;
    return true;
  });
  const argsValues = {};
  let partsToDelete = []; // loop on every parts

  parts.forEach((part, j) => {
    let smallName = null,
        bigName = null;

    if (part.slice(0, 2) === '--') {
      bigName = part.slice(2);
    } else if (part.slice(0, 1) === '-') {
      smallName = part.slice(1);
    }

    if (smallName) {
      let argName = null,
          argsString = null,
          value = null;

      for (let i = 0; i < Object.keys(args).length; i++) {
        argsString = ` ${args[Object.keys(args)[i]]} `;

        if (argsString.includes(` -${smallName} `)) {
          argName = Object.keys(args)[i];
          break;
        }
      }

      const argObj = parseArgsString(argsString, argName);
      value = parts[j + 1].split(',');
      value = value.map(v => {
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? (0, _parse.default)(v) : v;
      });

      if (value.length <= 1) {
        value = value[0];
      }

      partsToDelete.push(part);

      if (typeof value === 'string') {
        if (value.slice(0, 2) === '--' || value.slice(0, 1) === '-') {
          if (argObj.types.indexOf('Boolean') === -1) {
            throw new Error(`The argument "${argName}" want to set his value to "true" but does not accept "Boolean" as type... Here's are the allowed types: "${argObj.types.join(',')}"`);
          } else {
            value = true;
          }
        } else {
          partsToDelete.push(parts[j + 1]);
        }

        if (argObj.regex && !new RegExp(argObj.regex.slice(1, -1), 'g').test(value)) {
          throw new Error(`The argument "${argName}"want to set his value to "${value}" but this does not match the argument regex "${argObj.regex}"...`);
        }
      } else {
        partsToDelete.push(parts[j + 1]);
      }

      delete argsObj[argName];
      argsValues[argName] = {
        value: value,
        types: argObj.types,
        regex: argObj.regex || undefined,
        default: argObj.default
      };
    } else if (bigName) {
      let argName = null,
          argsString = null,
          value = null;

      for (let i = 0; i < Object.keys(args).length; i++) {
        argsString = ` ${args[Object.keys(args)[i]]} `;

        if (argsString.includes(` --${bigName} `)) {
          argName = Object.keys(args)[i];
          break;
        }
      }

      const argObj = parseArgsString(argsString, argName);
      value = parts[j + 1].split(',');
      value = value.map(v => {
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? (0, _parse.default)(v) : v;
      });

      if (value.length <= 1) {
        value = value[0];
      }

      partsToDelete.push(part);

      if (typeof value === 'string') {
        if (value.slice(0, 2) === '--' || value.slice(0, 1) === '-') {
          if (argObj.types.indexOf('Boolean') === -1) {
            throw new Error(`The argument "${argName}" want to set his value to "true" but does not accept "Boolean" as type... Here's are the allowed types: "${argObj.types.join(',')}"`);
          } else {
            value = true;
          }
        } else {
          partsToDelete.push(parts[j + 1]);
        }

        if (argObj.regex && !new RegExp(argObj.regex.slice(1, -1), 'g').test(value)) {
          throw new Error(`The argument "${argName}"want to set his value to "${value}" but this does not match the argument regex "${argObj.regex}"...`);
        }
      } else {
        partsToDelete.push(parts[j + 1]);
      }

      delete argsObj[argName];
      argsValues[argName] = {
        value: value,
        types: argObj.types,
        regex: argObj.regex || undefined,
        default: argObj.default
      };
    }
  }); // filter the parts already handled

  parts = parts.filter((p, i) => {
    if (partsToDelete.indexOf(p) !== -1) return false;
    return true;
  }); // loop on the remaining parts

  parts.forEach(v => {
    const valuesArray = v.match(/\w+|"[^"]+"/g);
    valuesArray.forEach(value => {
      value = (0, _unquote.default)(value).split(',');
      value = value.map(v => {
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? (0, _parse.default)(v) : v;
      });

      if (value.length <= 1) {
        value = value[0];
      }

      for (let i = 0; i < Object.keys(argsObj).length; i++) {
        const argName = Object.keys(argsObj)[i];
        const argsString = args[argName];
        const argObj = parseArgsString(argsString, argName);
        const type = Array.isArray(value) ? 'array' : typeof value;

        if (!argsValues[argName] && argObj.types.indexOf((0, _upperFirst.default)(type)) !== -1) {
          if (typeof value === 'string' && argObj.regex && !new RegExp(argObj.regex, 'g').test(value)) {
            continue;
          }

          delete argsObj[argName];
          argsValues[argName] = {
            value,
            types: argObj.types,
            regex: argObj.regex || undefined,
            default: argObj.default
          };
        }
      }
    });
  });
  Object.keys(argsObj).forEach(k => {
    if (argsValues[k]) return;
    const argObj = parseArgsString(argsObj[k], k);
    const value = argObj.default;
    delete argsObj[k];
    argsValues[k] = {
      value: typeof value === 'string' && availableTypes.indexOf(value.toLowerCase()) === -1 ? (0, _parse.default)(value) : value,
      types: argObj.types,
      regex: argObj.regex || undefined,
      default: argObj.default
    };
  });
  return argsValues; // // handle the "alone" atruments that mean boolean true
  // const aloneSmallArgs = string.match(/\s(-[a-zA-Z])\s-/g);
  // const lastAloneSmallArgs = string.match(/\s(-[a-zA-Z])\s?$/g);
  // const aloneBigArgs = string.match(/\s(--[a-zA-Z-]+)\s-/g);
  // const lastAloneBigArgs = string.match(/\s(--[a-zA-Z-]+)\s?$/g);
  // if (aloneSmallArgs) {
  //   aloneSmallArgs.forEach((arg) => {
  //     const splitedArg = arg.trim().split(' ');
  //     string = string.replace(arg, ` ${splitedArg[0]} true -`);
  //   });
  // }
  // if (lastAloneSmallArgs) {
  //   lastAloneSmallArgs.forEach((arg) => {
  //     const splitedArg = arg.trim().split(' ');
  //     string = string.replace(arg, ` ${splitedArg[0]} true `);
  //   });
  // }
  // if (aloneBigArgs) {
  //   aloneBigArgs.forEach((arg) => {
  //     const splitedArg = arg.trim().split(' ');
  //     string = string.replace(arg, ` ${splitedArg[0]} true -`);
  //   });
  // }
  // if (lastAloneBigArgs) {
  //   lastAloneBigArgs.forEach((arg) => {
  //     const splitedArg = arg.trim().split(' ');
  //     string = string.replace(arg, ` ${splitedArg[0]} true `);
  //   });
  // }
  //
  // const keys = Object.keys(args);
  // const resultObject = {};
  //
  //
  //
  // // search for the "-a 'something cool'" style
  // const regSmallArg = /\s-[a-zA-Z]\s(?![-])[\S]+\s/g;
  // const regBigArg = /\s--[a-zA-Z-]+\s(?![-])[\S]+\s/g;
  // const regRestArg = /(?![-])[\S]+/g;
  //
  // const smallArgs = string.match(regSmallArg);
  // if (smallArgs) {
  //   smallArgs.forEach((item, i) => {
  //     string = string.replace(item, ' ');
  //   });
  // }
  //
  // const bigArgs = string.match(regBigArg);
  // if (bigArgs) {
  //   bigArgs.forEach((item, i) => {
  //     string = string.replace(item, ' ');
  //   });
  // }
  //
  // const restArgs = string.match(regRestArg);
  // if (restArgs) {
  //   restArgs.forEach((item, i) => {
  //     string = string.replace(item, ' ');
  //   });
  // }
  //
  // // loop on each keys to search for corresponding value
  // for (let _i=0; _i<keys.length; _i++) {
  //   const k = keys[_i];
  //
  //   let keyArgs = args[k];
  //   let keyString = null;
  //   let keyPreprocess = null;
  //
  //   if (typeof keyArgs === 'object') {
  //     if (keyArgs.args === undefined || typeof keyArgs.args !== 'string') {
  //       console.error('sugar.js.string.parseArgs', `You have passed an object as argument for the key "${k}" but this object has to have an "args" property of type "String" and here's your object passed...`, keyArgs);
  //       return {};
  //     }
  //     if (keyArgs.preprocess === undefined || typeof keyArgs.preprocess !== 'function') {
  //       console.error('sugar.js.string.parseArgs', `You have passed an object as argument for the key "${k}" but this object has to have an "preprocess" property of type "Function" and here's your object passed...`, keyArgs);
  //       return {};
  //     }
  //     keyString = ' ' + keyArgs.args + ' ';
  //     keyPreprocess = keyArgs.preprocess;
  //   } else {
  //     keyString = ' ' + keyArgs + ' ';
  //   }
  //
  //   const regKeyArgsType = /\s[a-zA-Z]+/g;
  //   const regKeyArgsSmallName = /\s-[a-zA-Z]\s/g;
  //   const regKeyArgsBigName = /\s--[a-zA-Z-]+\s/g;
  //   const regKeyArgsRegex = /\s\/[\S]+\/\s/g;
  //   const regKeyArgsDefault = /['|"|`](.*)['|"|`]/g
  //
  //   let type = keyString.match(regKeyArgsType);
  //   if (type && type.length) type = type[0].trim();
  //
  //   let smallName = keyString.match(regKeyArgsSmallName);
  //   if (smallName && smallName.length) smallName = smallName[0].trim();
  //
  //   let bigName = keyString.match(regKeyArgsBigName);
  //   if (bigName && bigName.length) bigName = bigName[0].trim();
  //
  //   let regex = keyString.match(regKeyArgsRegex);
  //   if (regex && regex.length) regex = regex[0].trim().slice(1,-1);
  //
  //   let defaultValue = keyString.match(regKeyArgsDefault);
  //   if (defaultValue && defaultValue.length === 1) defaultValue = __unquote(defaultValue[0]);
  //
  //   if (smallArgs && smallName && resultObject[k] === undefined) {
  //     for (let i=0; i<smallArgs.length; i++) {
  //       let item = smallArgs[i];
  //       item = item.trim();
  //       const key = item.slice(0,2);
  //
  //       if (key !== smallName) continue;
  //
  //       let value = item.slice(2).trim();
  //       value = __unquote(value);
  //
  //       // check that the value match the args
  //       if (type && typeof __parse(value) !== type.toLowerCase() && availableTypes.indexOf(type.toLowerCase()) === -1) continue;
  //       if (regex) {
  //         const r = new RegExp(regex);
  //         if ( ! r.test(value)) continue;
  //         // check if some parentheses exists
  //         const matches = value.match(regex);
  //         if (matches[1] !== undefined) {
  //           value = matches[1];
  //         }
  //       }
  //
  //       smallArgs.splice(i, 1);
  //       if (keyPreprocess) {
  //         if (typeof value === 'string' && availableTypes.indexOf(value) !== -1) {
  //           resultObject[k] = keyPreprocess(value);
  //         } else {
  //           resultObject[k] = keyPreprocess(__parse(value));
  //         }
  //       } else {
  //         if (typeof value === 'string' && availableTypes.indexOf(value) !== -1) {
  //           resultObject[k] = value;
  //         } else {
  //           resultObject[k] = __parse(value);
  //         }
  //       }
  //       break;
  //
  //     }
  //   }
  //
  //   if (bigArgs && bigName && resultObject[k] === undefined) {
  //     for (let i=0; i<bigArgs.length; i++) {
  //       let item = bigArgs[i];
  //       item = item.trim();
  //       const argKey = item.match(/--[\S]+/g)[0];
  //
  //       if (argKey !== bigName) continue;
  //
  //       item = item.replace(argKey, '').trim();
  //       let value = item;
  //       value = __unquote(value);
  //
  //       // check that the value match the args
  //       if (type && typeof __parse(value) !== type.toLowerCase() && availableTypes.indexOf(type.toLowerCase()) === -1) continue;
  //
  //       if (regex) {
  //         const r = new RegExp(regex);
  //         if ( ! r.test(value)) continue;
  //         // check if some parentheses exists
  //         const matches = value.match(regex);
  //         if (matches[1] !== undefined) {
  //           value = matches[1];
  //         }
  //       }
  //
  //       bigArgs.splice(i, 1);
  //       if (keyPreprocess) {
  //         if (availableTypes.indexOf(value.toLowerCase()) !== -1) {
  //           resultObject[k] = keyPreprocess(value);
  //         } else {
  //           resultObject[k] = keyPreprocess(__parse(value));
  //         }
  //       } else {
  //         if (availableTypes.indexOf(value.toLowerCase()) !== -1) {
  //           resultObject[k] = value;
  //         } else {
  //           resultObject[k] = __parse(value);
  //         }
  //       }
  //       break;
  //
  //     }
  //   }
  //
  //   console.log(restArgs, k);
  //
  //   if (restArgs && resultObject[k] === undefined) {
  //     for (let i=0; i<restArgs.length; i++) {
  //       let item = restArgs[i];
  //       item = item.trim();
  //       let value = item;
  //       value = __unquote(value);
  //
  //       // check that the value match the args
  //       if (type && typeof __parse(value) !== type.toLowerCase() && availableTypes.indexOf(type.toLowerCase()) === -1) {
  //         continue;
  //       }
  //       if (regex) {
  //         const r = new RegExp(regex);
  //         if ( ! r.test(value)) continue;
  //         // check if some parentheses exists
  //         const matches = value.match(regex);
  //         if (matches[1] !== undefined) {
  //           value = matches[1];
  //         }
  //       }
  //
  //       restArgs.splice(i, 1);
  //       if (keyPreprocess) {
  //         if (availableTypes.indexOf(value.toLowerCase()) !== -1) {
  //           resultObject[k] = keyPreprocess(value);
  //         } else {
  //           resultObject[k] = keyPreprocess(__parse(value));
  //         }
  //       } else {
  //         if (availableTypes.indexOf(value.toLowerCase()) !== -1) {
  //           resultObject[k] = value;
  //         } else {
  //           resultObject[k] = __parse(value);
  //         }
  //       }
  //       break;
  //     }
  //   }
  //
  //   if (resultObject[k] === undefined && defaultValue !== undefined) {
  //     resultObject[k] = __parse(defaultValue);
  //   }
  //
  // }
  //
  // return resultObject;
  // // split the string without the quotes
  // const parts = string.match(/(('|").*?('|")|[^('|")\s]+)+(?=\s*|\s*$)/g);
  //
  // // init the resulting object
  // const resultObject = {};
  //
  // let argsSettings = {};
  // Object.keys(args).forEach(key => {
  //   const arg = args[key];
  //   let smallName, bigName, type;
  //   // parse the argument definition
  //   const argParts = arg.split(' ');
  //   // loop on the args parts
  //   for (let i=0; i<argParts.length; i++) {
  //     const p = argParts[i];
  //     if (p.slice(0,2) === '--') {
  //       bigName = p.slice(2);
  //     } else if (p.slice(0,1) === '-' && p.length === 2) {
  //       smallName = p.slice(1);
  //     } else {
  //       type = p;
  //     }
  //   }
  //   argsSettings[key] = {
  //     smallName, bigName, type
  //   };
  // });
  //
  // // loop on the parts
  // for (let i=0; i<parts.length; i++) {
  //   const p = parts[i];
  //
  //   let smallName, bigName;
  //   if (p.slice(0,2) === '--') {
  //     bigName = p.slice(2);
  //   } else if (p.slice(0,1) === '-' && p.length === 2) {
  //     smallName = p.slice(1);
  //   }
  //
  //   for (let j=0; j<Object.keys(argsSettings).length; j++) {
  //
  //     const k = Object.keys(argsSettings)[j];
  //
  //     if (resultObject[k] !== undefined) {
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       break;
  //     }
  //
  //     const set = argsSettings[k];
  //
  //     if (smallName && set.smallName === smallName) {
  //       resultObject[k] = __parse(parts[i+1]);
  //       i++;
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       break;
  //     }
  //     if (bigName && set.bigName === bigName) {
  //       resultObject[k] = __parse(parts[i+1]);
  //       i++;
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       break;
  //     }
  //
  //     const type = typeof __parse(p);
  //     // console.log(p, type.charAt(0).toUpperCase() + type.slice(1));
  //     if (type.charAt(0).toUpperCase() + type.slice(1) === set.type) {
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       resultObject[k] = __parse(p);
  //       break;
  //     }
  //   }
  //
  // }
  // return resultObject;
};

exports.default = _default;
module.exports = exports.default;