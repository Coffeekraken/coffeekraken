// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __getArgsNames = require('./getArgsNames');
    var __check = require('check-types');
    var __parseArgs = require('../string/parseArgs');
    var __upperFirst = require('../string/upperFirst');
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
    function checkArgs(func, args, descriptor, throwError) {
        if (throwError === void 0) { throwError = true; }
        // get the function arguments names
        var argumentsNames = __getArgsNames(func);
        var availableTypes = [
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
        var resultObj = {};
        // loop on the arguments names
        argumentsNames.forEach(function (argName, i) {
            // get the argument description object
            var descriptionObj = __parseArgs(descriptor[argName], {
                definition: {
                    types: '["String","Array"] -t --types',
                    values: 'Array -v --values',
                    of: 'Array -o --of /[a-zA-Z]+,?/ "Number,BigInt,String,Boolean,Null,Undefined,Object,Symbol,Function,Array"',
                    greater: 'Number -g --greater /^\\d$/',
                    lower: 'Number -l --lower /^\\d$/',
                    allowUndefined: 'Boolean -u --allow-undefined "false"',
                    allowNull: 'Boolean -n --allow-null "false"',
                    default: "[" + availableTypes
                        .map(function (i) { return "\"" + __upperFirst(i) + "\""; })
                        .toString() + "] -d --default /\"[\\s\\S]+\"/"
                }
            });
            if (!descriptor[argName])
                return;
            var argValue = args[i];
            // construct the resultObj
            resultObj[argName] = args[i];
            // check allow undefined
            if (!descriptionObj.allowUndefined.value && argValue === undefined) {
                throw new Error("The argument <yellow><bold>\"" + argName + "\"</bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan> cannot be undefined...");
            }
            // check allow null
            if (!descriptionObj.allowNull.value && argValue === null) {
                throw new Error("The argument <yellow><bold>\"" + argName + "\"</bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan>cannot be null...");
            }
            // check type
            var allowedTypes = typeof descriptionObj.types.value
                ? [descriptionObj.types.value]
                : descriptionObj.types.value;
            if (Array.isArray(allowedTypes)) {
                var argType_1 = Array.isArray(argValue)
                    ? 'Array'
                    : __upperFirst(typeof argValue);
                var isValid_1 = argValue === undefined && descriptionObj.allowUndefined.value
                    ? true
                    : false;
                isValid_1 =
                    argValue === null && descriptionObj.allowNull.value ? true : isValid_1;
                allowedTypes.forEach(function (type) {
                    if (__upperFirst(type) === argType_1) {
                        isValid_1 = true;
                    }
                });
                if (!isValid_1) {
                    var argValueToDisplay = typeof argValue === 'function' ? argValue.name : argValue;
                    if (argValueToDisplay === '' && typeof argValue === 'function')
                        argValueToDisplay = 'Anonymous function';
                    throw new Error("The argument <yellow><bold>\"" + argName + "\"<bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan> has to be of type <red>\"" + allowedTypes.join(',') + "\"</red> but the passed value <red>\"" + argValueToDisplay + "\"</red> is a \"" + argType_1 + "\"...");
                }
            }
            // check "of"
            if (descriptionObj.of.value && Array.isArray(argValue)) {
                var isTypeValid_1 = false;
                var invalidType_1 = null;
                var invalidValue_1 = null;
                argValue.forEach(function (v) {
                    if (isTypeValid_1)
                        return;
                    var type = Array.isArray(v) ? 'Array' : __upperFirst(typeof v);
                    if (descriptionObj.of.value.indexOf(type) !== -1) {
                        isTypeValid_1 = true;
                    }
                    else {
                        invalidType_1 = type;
                        invalidValue_1 = v;
                    }
                });
                if (!isTypeValid_1) {
                    throw new Error("The value <red>\"" + invalidValue_1 + "\"</red> in the argument Array <yellow><bold>\"" + argName + "\"</bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan> has to be of type <cyan><bold>\"" + descriptionObj.of.value.join(',') + "\"</bold></cyan> but is a <cyan><bold>\"" + invalidType_1 + "\"</bold></cyan>...");
                }
            }
            // check possible values
            if (descriptionObj.values.value &&
                Array.isArray(descriptionObj.values.value)) {
                var argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
                argValueToCheck.forEach(function (v) {
                    if (descriptionObj.values.value.indexOf(v) === -1) {
                        throw new Error("The argument <yellow><bold>\"" + argName + "\"</bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan> has to be one of these values <red><bold>\"" + descriptionObj.values.value.join(',') + "\"</bold></red> but is <red><bold>\"" + v + "\"</bold></red>...");
                    }
                });
            }
            // check greater
            if (typeof descriptionObj.greater.value === 'number' &&
                typeof argValue === 'number') {
                var argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
                argValueToCheck.forEach(function (v) {
                    if (v <= descriptionObj.greater.value) {
                        throw new Error("The argument <yellow><bold>\"" + argName + "\"</bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan> has to be greater than <red><bold>\"" + descriptionObj.greater.value + "\"</bold></red> but is <red><bold>\"" + v + "\"</bold></red>...");
                    }
                });
            }
            // check lower
            if (typeof descriptionObj.lower.value === 'number' &&
                typeof argValue === 'number') {
                var argValueToCheck = Array.isArray(argValue) ? argValue : [argValue];
                argValueToCheck.forEach(function (v) {
                    if (v >= descriptionObj.lower.value) {
                        throw new Error("The argument <yellow><bold>\"" + argName + "\"</bold></yellow> of the function <cyan><bold>\"" + func.name + "\"</bold></cyan> has to be lower than <red><bold>\"" + descriptionObj.lower.value + "\"</bold></red> but is <red><bold>\"" + v + "\"</bold></red>...");
                    }
                });
            }
        });
        // return the result object
        return resultObj;
    }
    exports.default = checkArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2QyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuRCxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUVyRCxvREFBb0Q7SUFDcEQsZ0ZBQWdGO0lBQ2hGLGtCQUFrQjtJQUVsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCRztJQUNILFNBQXdCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFpQjtRQUFqQiwyQkFBQSxFQUFBLGlCQUFpQjtRQUN6RSxtQ0FBbUM7UUFDbkMsSUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQU0sY0FBYyxHQUFHO1lBQ3JCLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLFNBQVM7WUFDVCxNQUFNO1lBQ04sV0FBVztZQUNYLFFBQVE7WUFDUixRQUFRO1lBQ1IsVUFBVTtZQUNWLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQztRQUVGLDRCQUE0QjtRQUM1QixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFckIsOEJBQThCO1FBQzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxzQ0FBc0M7WUFDdEMsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDdEQsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSwrQkFBK0I7b0JBQ3RDLE1BQU0sRUFB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