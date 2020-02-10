const __getArgsNames = require('./getArgsNames');
const __check = require('check-types');
const __parseArgs = require('../string/parseArgs');

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
      type: 'String -t --type',
      values: 'Array -v --values "hello,world"',
      of: 'String -o --of /^String$/',
      greater: 'Number -g --greater /^\\d$/',
      lower: 'Number -l --lower /^\\d$/',
      allowUndefined: 'Boolean -u --allow-undefined "false"',
      allowNull: 'Boolean -n --allow-null "false"'
    });

    console.log(descriptionObj);

    return;

    // if no argument description, continue...
    if ( ! descriptionObj) return;
    // get the argument value
    const argValue = args[i];
    // check the type
    if ( ! descriptionObj.type) return;
    let types = Array.isArray(descriptionObj.type) ? descriptionObj.type : [descriptionObj.type];
    types.forEach((t) => {
      if (typeof argValue !== t.toLowerCase()) {



        throw new Error(`The argument "${argName}" of the function "${func.name}" has to be of type "${types.join(',')}" but is of type "${typeof argValue}"...`);
      }
    });

  });
}
