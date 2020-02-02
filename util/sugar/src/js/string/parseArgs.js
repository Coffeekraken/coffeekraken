import __parse from './parse';
import __unquote from './unquote';

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
export default (string, args) => {

  string = ' ' + string + ' ';

  const keys = Object.keys(args);
  const resultObject = {};

  // search for the "-a 'something cool'" style
  const regSmallArg = /\s-[a-z]\s(?![-])[\S]+\s/g;
  const regBigArg = /\s--[a-z]+\s(?![-])[\S]+\s/g;
  const regRestArg = /(?![-])[\S]+/g;

  const smallArgs = string.match(regSmallArg);
  if (smallArgs) {
    smallArgs.forEach((item, i) => {
      string = string.replace(item, ' ');
    });
  }

  const bigArgs = string.match(regBigArg);
  if (bigArgs) {
    bigArgs.forEach((item, i) => {
      string = string.replace(item, ' ');
    });
  }

  const restArgs = string.match(regRestArg);
  if (restArgs) {
    restArgs.forEach((item, i) => {
      string = string.replace(item, ' ');
    });
  }

  // loop on each keys to search for corresponding value
  for (let _i=0; _i<keys.length; _i++) {
    const k = keys[_i];

    let keyArgs = args[k];
    let keyString = null;
    let keyPreprocess = null;

    if (typeof keyArgs === 'object') {
      if (keyArgs.args === undefined || typeof keyArgs.args !== 'string') {
        console.error('sugar.js.string.parseArgs', `You have passed an object as argument for the key "${k}" but this object has to have an "args" property of type "String" and here's your object passed...`, keyArgs);
        return {};
      }
      if (keyArgs.preprocess === undefined || typeof keyArgs.preprocess !== 'function') {
        console.error('sugar.js.string.parseArgs', `You have passed an object as argument for the key "${k}" but this object has to have an "preprocess" property of type "Function" and here's your object passed...`, keyArgs);
        return {};
      }
      keyString = ' ' + keyArgs.args + ' ';
      keyPreprocess = keyArgs.preprocess;
    } else {
      keyString = ' ' + keyArgs + ' ';
    }

    const regKeyArgsType = /\s[a-zA-Z]+/g;
    const regKeyArgsSmallName = /\s-[a-zA-Z]\s/g;
    const regKeyArgsBigName = /\s--[a-zA-Z]+\s/g;
    const regKeyArgsRegex = /\s\/[\S]+\/\s/g;
    const regKeyArgsDefault = /['|"|`](.*)['|"|`]/g

    let type = keyString.match(regKeyArgsType);
    if (type && type.length) type = type[0].trim();

    let smallName = keyString.match(regKeyArgsSmallName);
    if (smallName && smallName.length) smallName = smallName[0].trim();

    let bigName = keyString.match(regKeyArgsBigName);
    if (bigName && bigName.length) bigName = bigName[0].trim();

    let regex = keyString.match(regKeyArgsRegex);
    if (regex && regex.length) regex = regex[0].trim().slice(1,-1);

    let defaultValue = keyString.match(regKeyArgsDefault);
    if (defaultValue && defaultValue.length === 1) defaultValue = __unquote(defaultValue[0]);

    if (smallArgs && smallName && resultObject[k] === undefined) {
      for (let i=0; i<smallArgs.length; i++) {
        let item = smallArgs[i];
        item = item.trim();
        const key = item.slice(0,2);

        if (key !== smallName) continue;

        let value = item.slice(2).trim();
        value = __unquote(value);

        // check that the value match the args
        if (type && typeof __parse(value) !== type.toLowerCase()) continue;
        if (regex) {
          const r = new RegExp(regex);
          if ( ! r.test(value)) continue;
          // check if some parentheses exists
          const matches = value.match(regex);
          if (matches[1] !== undefined) {
            value = matches[1];
          }
        }

        smallArgs.splice(i, 1);
        if (keyPreprocess) {
          resultObject[k] = keyPreprocess(__parse(value));
        } else {
          resultObject[k] = __parse(value);
        }
        break;

      }
    }

    if (bigArgs && bigName && resultObject[k] === undefined) {
      for (let i=0; i<bigArgs.length; i++) {
        let item = bigArgs[i];
        item = item.trim();
        const argKey = item.match(/--[\S]+/g)[0];

        if (argKey !== bigName) continue;

        item = item.replace(argKey, '').trim();
        let value = item;
        value = __unquote(value);

        // check that the value match the args
        if (type && typeof __parse(value) !== type.toLowerCase()) continue;
        if (regex) {
          const r = new RegExp(regex);
          if ( ! r.test(value)) continue;
          // check if some parentheses exists
          const matches = value.match(regex);
          if (matches[1] !== undefined) {
            value = matches[1];
          }
        }

        bigArgs.splice(i, 1);
        if (keyPreprocess) {
          resultObject[k] = keyPreprocess(__parse(value));
        } else {
          resultObject[k] = __parse(value);
        }
        break;

      }
    }

    if (restArgs && resultObject[k] === undefined) {
      for (let i=0; i<restArgs.length; i++) {
        let item = restArgs[i];
        item = item.trim();
        let value = item;
        value = __unquote(value);

        // check that the value match the args
        if (type && typeof __parse(value) !== type.toLowerCase()) {
          continue;
        }
        if (regex) {
          const r = new RegExp(regex);
          if ( ! r.test(value)) continue;
          // check if some parentheses exists
          const matches = value.match(regex);
          if (matches[1] !== undefined) {
            value = matches[1];
          }
        }

        restArgs.splice(i, 1);
        if (keyPreprocess) {
          resultObject[k] = keyPreprocess(__parse(value));
        } else {
          resultObject[k] = __parse(value);
        }
        break;
      }
    }

    if (resultObject[k] === undefined && defaultValue !== undefined) {
      resultObject[k] = __parse(defaultValue);
    }

  }

  return resultObject;

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

}
