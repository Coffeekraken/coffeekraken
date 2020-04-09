import __parse from './parse';
import __unquote from './unquote';
import __upperFirst from './upperFirst';

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

const availableTypes = [
  'number',
  'bigint',
  'string',
  'boolean',
  'null',
  'undefined',
  'object',
  'symbol',
  'function',
  'object',
  'array'
];

function parseArgsString(string, arg) {

  string = string.split(' ');
  string = string.filter((s) => {
    if (s.trim() === '') return false;
    return true;
  });
  const argObj = {};

  string.forEach((s) => {

    let isArrayOfTypes = true;
    const parsedString = __parse(s);
    if (Array.isArray(parsedString)) {
      for (let i = 0; i < parsedString.length; i++) {
        if (availableTypes.indexOf(parsedString[i].toLowerCase()) === -1) {
          isArrayOfTypes = false;
          break;
        }
      }
    } else {
      isArrayOfTypes = false;
    }

    if (isArrayOfTypes) {
      argObj.types = parsedString;
    } else if (availableTypes.indexOf(s.toLowerCase()) !== -1) {
      argObj.types = [s.trim()];
    } else if (s.trim().slice(0, 2) === '--') {
      argObj.bigName = s.trim().slice(2);
    } else if (s.trim().slice(0, 1) === '-') {
      argObj.smallName = s.trim().slice(1);
    } else if (s.trim().slice(0, 1) === '/' && s.trim().slice(-1) === '/') {
      argObj.regex = s.trim();
    } else if (s.trim().slice(0, 1) === '"' && s.trim().slice(-1) === '"') {
      argObj.default = s.trim().slice(1, -1).split(',');
      argObj.default = argObj.default.map((v) => {
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? __parse(v) : v;
      });
      if (argObj.default.length <= 1) {
        argObj.default = argObj.default[0];
      }
    }
  });

  // check the "default" value depending on the alloewd types
  if (argObj.default !== undefined) {
    if (Array.isArray(argObj.default) && argObj.types.indexOf('Array') !== -1) {

    } else if (argObj.types.indexOf(__upperFirst(typeof argObj.default)) === -1) {
      throw new Error(`The "default" value setted to "${argObj.default}" for the argument "${arg}" is of type "${__upperFirst(typeof argObj.default)}" and does not fit with the allowed types which are "${argObj.types.join(',')}"...`);
    }
  }

  return argObj;
}

export default (string, args) => {

  if (!string) return;

  let argsObj = Object.assign(args);

  // handle the "alone" atruments that mean boolean true
  const aloneSmallArgs = string.match(/\s(-[a-zA-Z])\s-[^0-9\s]+/g);
  const lastAloneSmallArgs = string.match(/\s(-[a-zA-Z])\s?$/g);
  const aloneBigArgs = string.match(/\s(--[a-zA-Z-]+)\s-[^0-9\s]+/g);
  const lastAloneBigArgs = string.match(/\s(--[a-zA-Z-]+)\s?$/g);
  if (aloneSmallArgs) {
    aloneSmallArgs.forEach((arg) => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true -`);
    });
  }
  if (lastAloneSmallArgs) {
    lastAloneSmallArgs.forEach((arg) => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true `);
    });
  }
  if (aloneBigArgs) {
    aloneBigArgs.forEach((arg) => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true -`);
    });
  }
  if (lastAloneBigArgs) {
    lastAloneBigArgs.forEach((arg) => {
      const splitedArg = arg.trim().split(' ');
      string = string.replace(arg, ` ${splitedArg[0]} true `);
    });
  }

  string = ' ' + string + ' ';

  let parts = string.split(/(--?[a-zA-Z0-9-]+)/g);

  parts = parts.map((p) => {
    return p.trim();
  });
  parts = parts.filter((p) => {
    if (p.trim() === '') return false;
    return true;
  });

  const argsValues = {};
  let partsToDelete = [];

  // loop on every parts
  parts.forEach((part, j) => {

    let smallName = null, bigName = null;

    if (part.slice(0, 2) === '--') {
      bigName = part.slice(2);
    } else if (part.slice(0, 1) === '-') {
      smallName = part.slice(1);
    }

    if (smallName) {

      let argName = null, argsString = null, value = null;

      for (let i = 0; i < Object.keys(args).length; i++) {
        argsString = ` ${args[Object.keys(args)[i]]} `;
        if (argsString.includes(` -${smallName} `)) {
          argName = Object.keys(args)[i];
          break;
        }
      }

      const argObj = parseArgsString(argsString, argName);

      const parsedValue = __parse(parts[j + 1]);
      if (Array.isArray(parsedValue)) {
        value = [parsedValue];
      } else {
        value = __unquote(parts[j + 1] || '').split(',');
      }

      value = value.map((v) => {
        if (Array.isArray(v)) return v;
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? __parse(v) : v;
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
          throw new Error(`The argument "${argName}" want to set his value to "${value}" but this does not match the argument regex "${argObj.regex}"...`);
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

      let argName = null, argsString = null, value = null;

      for (let i = 0; i < Object.keys(args).length; i++) {
        argsString = ` ${args[Object.keys(args)[i]]} `;
        if (argsString.includes(` --${bigName} `)) {
          argName = Object.keys(args)[i];
          break;
        }
      }

      const argObj = parseArgsString(argsString, argName);

      const parsedValue = __parse(parts[j + 1]);
      if (Array.isArray(parsedValue)) {
        value = [parsedValue];
      } else {
        value = __unquote(parts[j + 1] || '').split(',');
      }

      value = value.map((v) => {
        if (Array.isArray(v)) return v;
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? __parse(v) : v;
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
          throw new Error(`The argument "${argName}" want to set his value to "${value}" but this does not match the argument regex "${argObj.regex}"...`);
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

  });

  // filter the parts already handled
  parts = parts.filter((p, i) => {
    if (partsToDelete.indexOf(p) !== -1) return false;
    return true;
  });

  // loop on the remaining parts
  parts.forEach((v) => {

    const valuesArray = v.match(/\w+|"[^"]+"/g)

    valuesArray.forEach((value) => {
      const parsedValue = __parse(value);
      if (Array.isArray(parsedValue)) {
        value = [parsedValue];
      } else {
        value = __unquote(value || '').split(',');
      }
      value = value.map((v) => {
        if (Array.isArray(v)) return v;
        return availableTypes.indexOf(v.toLowerCase()) === -1 ? __parse(v) : v;
      });
      if (value.length <= 1) {
        value = value[0];
      }

      for (let i = 0; i < Object.keys(argsObj).length; i++) {
        const argName = Object.keys(argsObj)[i];
        const argsString = args[argName];
        const argObj = parseArgsString(argsString, argName);

        const type = Array.isArray(value) ? 'array' : typeof value;

        // console.log(type, argObj);

        if (!argsValues[argName] && argObj.types.indexOf(__upperFirst(type)) !== -1) {

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

  Object.keys(argsObj).forEach((k) => {

    if (argsValues[k]) return;

    const argObj = parseArgsString(argsObj[k], k);

    const value = argObj.default;

    delete argsObj[k];

    argsValues[k] = {
      value: typeof value === 'string' && availableTypes.indexOf(value.toLowerCase()) === -1 ? __parse(value) : value,
      types: argObj.types,
      regex: argObj.regex || undefined,
      default: argObj.default
    };


  });

  return argsValues;

}
