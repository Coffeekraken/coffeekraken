// @ts-nocheck
const __getArgsNames = require('./getArgsNames');
const __check = require('check-types');
const __parseArgs = require('../string/parseArgs');
const __upperFirst = require('../string/upperFirst');
// TODO Make tests and prettify the code if possible
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function checkArgs(func, args, descriptor, throwError = true) {
    // get the function arguments names
    const argumentsNames = __getArgsNames(func);
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
    // init the resulting object
    const resultObj = {};
    // loop on the arguments names
    argumentsNames.forEach((argName, i) => {
        // get the argument description object
        const descriptionObj = __parseArgs(descriptor[argName], {
            definition: {
                types: '["String","Array"] -t --types',
                values: 'Array -v --values',
                of: 'Array -o --of /[a-zA-Z]+,?/ "Number,BigInt,String,Boolean,Null,Undefined,Object,Symbol,Function,Array"',
                greater: 'Number -g --greater /^\\d$/',
                lower: 'Number -l --lower /^\\d$/',
                allowUndefined: 'Boolean -u --allow-undefined "false"',
                allowNull: 'Boolean -n --allow-null "false"',
                default: `[${availableTypes
                    .map((i) => `"${__upperFirst(i)}"`)
                    .toString()}] -d --default /\"[\\s\\S]+\"/`
            }
        });
        if (!descriptor[argName])
            return;
        const argValue = args[i];
        // construct the resultObj
        resultObj[argName] = args[i];
        // check allow undefined
        if (!descriptionObj.allowUndefined.value && argValue === undefined) {
            throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> cannot be undefined...`);
        }
        // check allow null
        if (!descriptionObj.allowNull.value && argValue === null) {
            throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan>cannot be null...`);
        }
        // check type
        const allowedTypes = typeof descriptionObj.types.value
            ? [descriptionObj.types.value]
            : descriptionObj.types.value;
        if (Array.isArray(allowedTypes)) {
            const argType = Array.isArray(argValue)
                ? 'Array'
                : __upperFirst(typeof argValue);
            let isValid = argValue === undefined && descriptionObj.allowUndefined.value
                ? true
                : false;
            isValid =
                argValue === null && descriptionObj.allowNull.value ? true : isValid;
            allowedTypes.forEach((type) => {
                if (__upperFirst(type) === argType) {
                    isValid = true;
                }
            });
            if (!isValid) {
                let argValueToDisplay = typeof argValue === 'function' ? argValue.name : argValue;
                if (argValueToDisplay === '' && typeof argValue === 'function')
                    argValueToDisplay = 'Anonymous function';
                throw new Error(`The argument <yellow><bold>"${argName}"<bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be of type <red>"${allowedTypes.join(',')}"</red> but the passed value <red>"${argValueToDisplay}"</red> is a "${argType}"...`);
            }
        }
        // check "of"
        if (descriptionObj.of.value && Array.isArray(argValue)) {
            let isTypeValid = false;
            let invalidType = null;
            let invalidValue = null;
            argValue.forEach((v) => {
                if (isTypeValid)
                    return;
                const type = Array.isArray(v) ? 'Array' : __upperFirst(typeof v);
                if (descriptionObj.of.value.indexOf(type) !== -1) {
                    isTypeValid = true;
                }
                else {
                    invalidType = type;
                    invalidValue = v;
                }
            });
            if (!isTypeValid) {
                throw new Error(`The value <red>"${invalidValue}"</red> in the argument Array <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be of type <cyan><bold>"${descriptionObj.of.value.join(',')}"</bold></cyan> but is a <cyan><bold>"${invalidType}"</bold></cyan>...`);
            }
        }
        // check possible values
        if (descriptionObj.values.value &&
            Array.isArray(descriptionObj.values.value)) {
            const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
            argValueToCheck.forEach((v) => {
                if (descriptionObj.values.value.indexOf(v) === -1) {
                    throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be one of these values <red><bold>"${descriptionObj.values.value.join(',')}"</bold></red> but is <red><bold>"${v}"</bold></red>...`);
                }
            });
        }
        // check greater
        if (typeof descriptionObj.greater.value === 'number' &&
            typeof argValue === 'number') {
            const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
            argValueToCheck.forEach((v) => {
                if (v <= descriptionObj.greater.value) {
                    throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be greater than <red><bold>"${descriptionObj.greater.value}"</bold></red> but is <red><bold>"${v}"</bold></red>...`);
                }
            });
        }
        // check lower
        if (typeof descriptionObj.lower.value === 'number' &&
            typeof argValue === 'number') {
            const argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
            argValueToCheck.forEach((v) => {
                if (v >= descriptionObj.lower.value) {
                    throw new Error(`The argument <yellow><bold>"${argName}"</bold></yellow> of the function <cyan><bold>"${func.name}"</bold></cyan> has to be lower than <red><bold>"${descriptionObj.lower.value}"</bold></red> but is <red><bold>"${v}"</bold></red>...`);
                }
            });
        }
    });
    // return the result object
    return resultObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFckQsb0RBQW9EO0FBQ3BELGdGQUFnRjtBQUNoRixrQkFBa0I7QUFFbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEdBQUcsSUFBSTtJQUN6RSxtQ0FBbUM7SUFDbkMsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVDLE1BQU0sY0FBYyxHQUFHO1FBQ3JCLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFNBQVM7UUFDVCxNQUFNO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixRQUFRO1FBQ1IsVUFBVTtRQUNWLFFBQVE7UUFDUixPQUFPO0tBQ1IsQ0FBQztJQUVGLDRCQUE0QjtJQUM1QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsOEJBQThCO0lBQzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsc0NBQXNDO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEQsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSwrQkFBK0I7Z0JBQ3RDLE1BQU0sRUFBRSxt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