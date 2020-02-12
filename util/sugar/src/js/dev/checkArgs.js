const __getArgsNames = require('./getArgsNames');
const __check = require('check-types');
const __parseArgs = require('../string/parseArgs');
const __upperFirst = require('../string/upperFirst');

/**
 * @name                        checkArgs
 * @namespace                   sugar.js.dev
 * @type                        Function
 *
 * Check the arguments of a function by checking his type, his values, etc...
 * Throw an error if something is not good with the details of why...
 *
 * @param             {Object}                  args                  The arguments object description
 * @param             {Boolean}                 [throwError=true]     Specify if you want that the function throw an error if needed or not
 * @return            {Boolean}                                       true if all is good, false if not
 *
 * @example           js
 * import checkArgs from '@coffeekraken/sugar/js/dev/checkArgs';
 * function(argument1, plop, hello) {
 *    checkArgs({
 *      arguments1: {
 *        type: 'String',
 *        value: ['hello','world']
 *      },
 *      plop: {
 *        type: 'Array'
 *      },
 *      hello: {
 *        value: [true, false, null]
 *      }
 *    });
 *    // your function source code...
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function checkArgs(func, args, descriptor, throwError = true) {
  // get the function arguments names
  const argumentsNames = __getArgsNames(func);
  // loop on the arguments names
  argumentsNames.forEach((argName, i) => {
    // get the argument description object
    const descriptionObj = __parseArgs(descriptor[argName], {
      types: '["String","Array"] -t --types',
      values: 'Array -v --values',
      of: 'Array -o --of /[a-zA-Z]+,?/ "Number,BigInt,String,Boolean,Null,Undefined,Object,Symbol,Function,Array"',
      greater: 'Number -g --greater /^\\d$/',
      lower: 'Number -l --lower /^\\d$/',
      allowUndefined: 'Boolean -u --allow-undefined "false"',
      allowNull: 'Boolean -n --allow-null "false"'
    });

    if ( ! descriptor[argName]) return;

    const argValue = args[i];

    // check allow undefined
    if ( ! descriptionObj.allowUndefined.value && argValue === undefined) {
      throw new Error(`The argument "${argName}" of the function "${func.name}" cannot be undefined...`);
    }

    // check allow null
    if ( ! descriptionObj.allowNull.value && argValue === null) {
      throw new Error(`The argument "${argName}" of the function "${func.name}" cannot be null...`);
    }

    // check type
    const t = typeof descriptionObj.types.value ? [descriptionObj.types.value] : descriptionObj.types.value;
    if (Array.isArray(t)) {
      const argType = Array.isArray(argValue) ? 'Array' : __upperFirst(typeof argValue);
      t.forEach((type) => {
        if (__upperFirst(type) !== argType) {
          let argValueToDisplay = typeof argValue === 'function' ? argValue.name : argValue;
          if (argValueToDisplay === '' && typeof argValue === 'function') argValueToDisplay = 'Anonymous function';
          throw new Error(`The argument "${argName}" of the function "${func.name}" has to be of type "${t.join(',')}" but the passed value "${argValueToDisplay}" is a "${argType}"...`);
        }
      });
    }

    // check "of"
    if (descriptionObj.of.value && Array.isArray(argValue)) {
      let isTypeValid = false;
      let invalidType = null;
      let invalidValue = null;
      argValue.forEach((v) => {
        if (isTypeValid) return;
        const type = Array.isArray(v) ? 'Array' : __upperFirst(typeof v);
        if (descriptionObj.of.value.indexOf(type) !== -1) {
          isTypeValid = true;
        } else {
          invalidType = type;
          invalidValue = v;
        }
      });
      if ( ! isTypeValid) {
        throw new Error(`The value "${invalidValue}" in the argument Array "${argName}" has to be of type "${descriptionObj.of.value.join(',')}" but is a "${invalidType}"...`);
      }
    }

    // check possible values
    if (descriptionObj.values.value && Array.isArray(descriptionObj.values.value)) {

      const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];

      argValueToCheck.forEach((v) => {
        if (descriptionObj.values.value.indexOf(v) === -1) {
          throw new Error(`The argument "${argName}" of the function "${func.name}" has to be one of these values "${descriptionObj.values.value.join(',')}" but is "${v}"...`);
        }
      });
    }

    // check greater
    if (typeof descriptionObj.greater.value === 'number' && typeof argValue === 'number') {

      const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];

      argValueToCheck.forEach((v) => {
        if (v <= descriptionObj.greater.value) {
          throw new Error(`The argument "${argName}" of the function "${func.name}" has to be greater than "${descriptionObj.greater.value}" but is "${v}"...`);
        }
      });

    }

    // check lower
    if (typeof descriptionObj.lower.value === 'number' && typeof argValue === 'number') {

      const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];

      argValueToCheck.forEach((v) => {
        if (v >= descriptionObj.lower.value) {
          throw new Error(`The argument "${argName}" of the function "${func.name}" has to be lower than "${descriptionObj.lower.value}" but is "${v}"...`);
        }
      });

    }

  });
}
