"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkArgs;

const __getArgsNames = require('./getArgsNames');

const __check = require('check-types');

const __parseArgs = require('../string/parseArgs');

const __upperFirst = require('../string/upperFirst'); // TODO Make tests and prettify the code if possible
// TODO Check for environment variable to desactivate the checking on production
// TODO Update doc

/**
 * @name                        checkArgs
 * @namespace           js.dev
 * @type                        Function
 *
 * Check the arguments of a function by checking his type, his values, etc...
 * Throw an error if something is not good with the details of why...
 *
 * @param             {Object}                  args                  The arguments object description
 * @param             {Boolean}                 [throwError=true]     Specify if you want that the function throw an error if needed or not
 * @return            {Object}                                        Return an object of the arguments and values
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


function checkArgs(func, args, descriptor, throwError = true) {
  // get the function arguments names
  const argumentsNames = __getArgsNames(func);

  const availableTypes = ['number', 'bigint', 'string', 'boolean', 'null', 'undefined', 'object', 'symbol', 'function', 'object', 'array']; // init the resulting object

  const resultObj = {}; // loop on the arguments names

  argumentsNames.forEach((argName, i) => {
    // get the argument description object
    console.log(descriptor[argName]);

    const descriptionObj = __parseArgs(descriptor[argName], {
      types: '["String","Array"] -t --types',
      values: 'Array -v --values',
      of: 'Array -o --of /[a-zA-Z]+,?/ "Number,BigInt,String,Boolean,Null,Undefined,Object,Symbol,Function,Array"',
      greater: 'Number -g --greater /^\\d$/',
      lower: 'Number -l --lower /^\\d$/',
      allowUndefined: 'Boolean -u --allow-undefined "false"',
      allowNull: 'Boolean -n --allow-null "false"',
      default: `[${availableTypes.map(i => `"${__upperFirst(i)}"`).toString()}] -d --default /\"[\\s\\S]+\"/`
    });

    console.log(descriptionObj);
    if (!descriptor[argName]) return;
    const argValue = args[i]; // construct the resultObj

    resultObj[argName] = args[i]; // check allow undefined

    if (!descriptionObj.allowUndefined.value && argValue === undefined) {
      throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> cannot be undefined...`);
    } // check allow null


    if (!descriptionObj.allowNull.value && argValue === null) {
      throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan>cannot be null...`);
    } // check type


    const allowedTypes = typeof descriptionObj.types.value ? [descriptionObj.types.value] : descriptionObj.types.value;

    if (Array.isArray(allowedTypes)) {
      const argType = Array.isArray(argValue) ? 'Array' : __upperFirst(typeof argValue);
      let isValid = argValue === undefined && descriptionObj.allowUndefined.value ? true : false;
      isValid = argValue === null && descriptionObj.allowNull.value ? true : isValid;
      allowedTypes.forEach(type => {
        if (__upperFirst(type) === argType) {
          isValid = true;
        }
      });

      if (!isValid) {
        let argValueToDisplay = typeof argValue === 'function' ? argValue.name : argValue;
        if (argValueToDisplay === '' && typeof argValue === 'function') argValueToDisplay = 'Anonymous function';
        throw new Error(`The argument <yellow><bold>"${argName}"<bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be of type <red>"${allowedTypes.join(',')}"</red> but the passed value <red>"${argValueToDisplay}"</red> is a "${argType}"...`);
      }
    } // check "of"


    if (descriptionObj.of.value && Array.isArray(argValue)) {
      let isTypeValid = false;
      let invalidType = null;
      let invalidValue = null;
      argValue.forEach(v => {
        if (isTypeValid) return;
        const type = Array.isArray(v) ? 'Array' : __upperFirst(typeof v);

        if (descriptionObj.of.value.indexOf(type) !== -1) {
          isTypeValid = true;
        } else {
          invalidType = type;
          invalidValue = v;
        }
      });

      if (!isTypeValid) {
        throw new Error(`The value <red>"${invalidValue}"</red> in the argument Array <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be of type <cyan><bold>"${descriptionObj.of.value.join(',')}"</bold></cyan> but is a <cyan><bold>"${invalidType}"</bold></cyan>...`);
      }
    } // check possible values


    if (descriptionObj.values.value && Array.isArray(descriptionObj.values.value)) {
      const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
      argValueToCheck.forEach(v => {
        if (descriptionObj.values.value.indexOf(v) === -1) {
          throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be one of these values <red><bold>"${descriptionObj.values.value.join(',')}"</bold></red> but is <red><bold>"${v}"</bold></red>...`);
        }
      });
    } // check greater


    if (typeof descriptionObj.greater.value === 'number' && typeof argValue === 'number') {
      const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
      argValueToCheck.forEach(v => {
        if (v <= descriptionObj.greater.value) {
          throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be greater than <red><bold>"${descriptionObj.greater.value}"</bold></red> but is <red><bold>"${v}"</bold></red>...`);
        }
      });
    } // check lower


    if (typeof descriptionObj.lower.value === 'number' && typeof argValue === 'number') {
      const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
      argValueToCheck.forEach(v => {
        if (v >= descriptionObj.lower.value) {
          throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be lower than <red><bold>"${descriptionObj.lower.value}"</bold></red> but is <red><bold>"${v}"</bold></red>...`);
        }
      });
    }
  }); // return the result object

  return resultObj;
}

module.exports = exports.default;