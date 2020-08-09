"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkArgs;

var __getArgsNames = require('./getArgsNames');

var __check = require('check-types');

var __parseArgs = require('../string/parseArgs');

var __upperFirst = require('../string/upperFirst'); // TODO Make tests and prettify the code if possible
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


function checkArgs(func, args, descriptor, throwError) {
  if (throwError === void 0) {
    throwError = true;
  }

  // get the function arguments names
  var argumentsNames = __getArgsNames(func);

  var availableTypes = ['number', 'bigint', 'string', 'boolean', 'null', 'undefined', 'object', 'symbol', 'function', 'object', 'array']; // init the resulting object

  var resultObj = {}; // loop on the arguments names

  argumentsNames.forEach((argName, i) => {
    // get the argument description object
    var descriptionObj = __parseArgs(descriptor[argName], {
      types: '["String","Array"] -t --types',
      values: 'Array -v --values',
      of: 'Array -o --of /[a-zA-Z]+,?/ "Number,BigInt,String,Boolean,Null,Undefined,Object,Symbol,Function,Array"',
      greater: 'Number -g --greater /^\\d$/',
      lower: 'Number -l --lower /^\\d$/',
      allowUndefined: 'Boolean -u --allow-undefined "false"',
      allowNull: 'Boolean -n --allow-null "false"',
      default: "[".concat(availableTypes.map(i => "\"".concat(__upperFirst(i), "\"")).toString(), "] -d --default /\"[\\s\\S]+\"/")
    });

    if (!descriptor[argName]) return;
    var argValue = args[i]; // construct the resultObj

    resultObj[argName] = args[i]; // check allow undefined

    if (!descriptionObj.allowUndefined.value && argValue === undefined) {
      throw new Error("The argument <yellow><bold>\"".concat(argName, "\"</bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan> cannot be undefined..."));
    } // check allow null


    if (!descriptionObj.allowNull.value && argValue === null) {
      throw new Error("The argument <yellow><bold>\"".concat(argName, "\"</bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan>cannot be null..."));
    } // check type


    var allowedTypes = typeof descriptionObj.types.value ? [descriptionObj.types.value] : descriptionObj.types.value;

    if (Array.isArray(allowedTypes)) {
      var argType = Array.isArray(argValue) ? 'Array' : __upperFirst(typeof argValue);
      var isValid = argValue === undefined && descriptionObj.allowUndefined.value ? true : false;
      isValid = argValue === null && descriptionObj.allowNull.value ? true : isValid;
      allowedTypes.forEach(type => {
        if (__upperFirst(type) === argType) {
          isValid = true;
        }
      });

      if (!isValid) {
        var argValueToDisplay = typeof argValue === 'function' ? argValue.name : argValue;
        if (argValueToDisplay === '' && typeof argValue === 'function') argValueToDisplay = 'Anonymous function';
        throw new Error("The argument <yellow><bold>\"".concat(argName, "\"<bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan> has to be of type <red>\"").concat(allowedTypes.join(','), "\"</red> but the passed value <red>\"").concat(argValueToDisplay, "\"</red> is a \"").concat(argType, "\"..."));
      }
    } // check "of"


    if (descriptionObj.of.value && Array.isArray(argValue)) {
      var isTypeValid = false;
      var invalidType = null;
      var invalidValue = null;
      argValue.forEach(v => {
        if (isTypeValid) return;
        var type = Array.isArray(v) ? 'Array' : __upperFirst(typeof v);

        if (descriptionObj.of.value.indexOf(type) !== -1) {
          isTypeValid = true;
        } else {
          invalidType = type;
          invalidValue = v;
        }
      });

      if (!isTypeValid) {
        throw new Error("The value <red>\"".concat(invalidValue, "\"</red> in the argument Array <yellow><bold>\"").concat(argName, "\"</bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan> has to be of type <cyan><bold>\"").concat(descriptionObj.of.value.join(','), "\"</bold></cyan> but is a <cyan><bold>\"").concat(invalidType, "\"</bold></cyan>..."));
      }
    } // check possible values


    if (descriptionObj.values.value && Array.isArray(descriptionObj.values.value)) {
      var argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
      argValueToCheck.forEach(v => {
        if (descriptionObj.values.value.indexOf(v) === -1) {
          throw new Error("The argument <yellow><bold>\"".concat(argName, "\"</bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan> has to be one of these values <red><bold>\"").concat(descriptionObj.values.value.join(','), "\"</bold></red> but is <red><bold>\"").concat(v, "\"</bold></red>..."));
        }
      });
    } // check greater


    if (typeof descriptionObj.greater.value === 'number' && typeof argValue === 'number') {
      var _argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];

      _argValueToCheck.forEach(v => {
        if (v <= descriptionObj.greater.value) {
          throw new Error("The argument <yellow><bold>\"".concat(argName, "\"</bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan> has to be greater than <red><bold>\"").concat(descriptionObj.greater.value, "\"</bold></red> but is <red><bold>\"").concat(v, "\"</bold></red>..."));
        }
      });
    } // check lower


    if (typeof descriptionObj.lower.value === 'number' && typeof argValue === 'number') {
      var _argValueToCheck2 = Array.isArray(argValue) ? argValue : [argValue];

      _argValueToCheck2.forEach(v => {
        if (v >= descriptionObj.lower.value) {
          throw new Error("The argument <yellow><bold>\"".concat(argName, "\"</bold></yellow> of the function <cyan><bold>\"").concat(func.name, "\"</bold></cyan> has to be lower than <red><bold>\"").concat(descriptionObj.lower.value, "\"</bold></red> but is <red><bold>\"").concat(v, "\"</bold></red>..."));
        }
      });
    }
  }); // return the result object

  return resultObj;
}

module.exports = exports.default;