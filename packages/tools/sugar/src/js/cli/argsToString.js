// @ts-nocheck
// @shared
import __toString from '../string/toString';
import __parseArgs from './parseArgs';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
/**
 * @name                  argsToString
 * @namespace           sugar.js.cli
 * @type                  Function
 * @status              beta
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}      [settings={}]               A settings object to configure your command build process:
 * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to use the aliases or not in the generated command
 * - definition (null) {Object}: Specify a definition object to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Test}      Testing when no definition is passed
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * }, {
 *    definition: {
 *      arg1: {
 *        type: 'String',
 *       alias: 'a',
 *       default: 'Plop'
 *     },
 *     myOtherArg: {
 *       type: 'String'
 *     },
 *     lastArg: {
 *       type: 'String',
 *       alias: 'l',
 *       default: 'Nelson'
 *     }
 *  }
 * });
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO: support deep object structure
// TODO: support required args
function argsToString(args, settings = {}) {
    settings = __deepMerge({
        definition: null,
        includeAllArgs: true,
        alias: true
    }, settings);
    if (typeof args === 'string') {
        args = __parseArgs(args, {
            definition: settings.definition
        });
    }
    if (!settings.definition) {
        let string = '';
        Object.keys(args).forEach((key) => {
            const argValue = args[key];
            let str = '';
            if (Array.isArray(argValue)) {
                argValue.forEach((value) => {
                    let valueStr;
                    if (value === true) {
                        valueStr = '';
                    }
                    else {
                        valueStr =
                            value.toString !== undefined &&
                                typeof value.toString === 'function'
                                ? value.toString()
                                : __toString(value);
                        if (typeof __parse(valueStr) === 'string')
                            valueStr = `"${valueStr}"`;
                    }
                    string += ` --${key} ${valueStr}`;
                });
            }
            else {
                if (argValue === true) {
                    str = '';
                }
                else {
                    str =
                        argValue.toString !== undefined &&
                            typeof argValue.toString === 'function'
                            ? argValue.toString()
                            : __toString(argValue);
                    if (typeof __parse(str) === 'string')
                        str = `"${str}"`;
                }
                string += ` --${key} ${str}`;
            }
        });
        return string.replace(/(\s){2,999999}/gm, ' ');
    }
    const cliArray = [];
    // loop on passed args
    Object.keys(settings.definition).forEach((argName) => {
        const defObj = settings.definition[argName];
        if (!defObj)
            return;
        if (!settings.includeAllArgs && args[argName] === undefined)
            return;
        const prefix = defObj.alias && settings.alias ? `-${defObj.alias}` : `--${argName}`;
        let value;
        if (args && args[argName] !== undefined)
            value = args[argName];
        else if (settings.definition[argName] &&
            settings.definition[argName].default)
            value = settings.definition[argName].default;
        if (value === undefined ||
            value === null
        // (defObj.type &&
        //   defObj.type.toLowerCase() === 'boolean' &&
        //   value === false)
        ) {
            return;
        }
        let valueStr;
        if (Array.isArray(value)) {
            value.forEach((val) => {
                if (val === true) {
                    valueStr = '';
                }
                else {
                    valueStr = __toString(value, {
                        beautify: false,
                        hihglight: false
                    });
                    if (defObj.type && defObj.type.toLowerCase() === 'string')
                        valueStr = `"${valueStr}"`;
                    // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                    if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                        (defObj.type && defObj.type.toLowerCase().includes('array'))) {
                        valueStr = `"${valueStr.split('"').join("'")}"`;
                    }
                }
                cliArray.push(`${prefix} ${valueStr}`);
            });
        }
        else {
            if (value === true) {
                valueStr = '';
            }
            else {
                valueStr = __toString(value, {
                    beautify: false,
                    hihglight: false
                });
                if (defObj.type && defObj.type.toLowerCase() === 'string')
                    valueStr = `"${valueStr}"`;
                // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                    (defObj.type && defObj.type.toLowerCase().includes('array'))) {
                    valueStr = `"${valueStr.split('"').join("'")}"`;
                }
            }
            // console.log(prefix, valueStr);
            cliArray.push(`${prefix} ${valueStr}`);
        }
    });
    return cliArray.join(' ').replace(/(\s){2,999999}/gm, ' ');
}
export default argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBRUgsc0NBQXNDO0FBQ3RDLDhCQUE4QjtBQUU5QixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxVQUFVLEVBQUUsSUFBSTtRQUNoQixjQUFjLEVBQUUsSUFBSTtRQUNwQixLQUFLLEVBQUUsSUFBSTtLQUNaLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRTtZQUN2QixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDaEMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBRWIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzQixRQUFRLENBQUMsT0FB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