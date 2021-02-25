// @ts-nocheck
// @shared
import __map from '../iterable/map';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __completeArgsObject from './completeArgsObject';
import __unquote from '../string/unquote';
import __ofType from '../is/ofType';
import __SType from '../type/SType';
/**
 * @name                        parseArgs
 * @namespace           sugar.js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    definition                   The arguments object description
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * @return            {Object}                                                The object of funded arguments and their values
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
 *    param1: { type: 'String', alias: 'p' },
 *    world: { type: 'Array', alias: 'w', validator: value => {
 *      return Array.isArray(value);
 *    }},
 *    bool: { type: 'Boolean', alias: 'b', default: false, required: true },
 *    'hello.world': { type: 'String' },
 *    help: { type: 'String', alias: 'h' },
 *    id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
 * }, {
 *    treatDotsAsObject: true,
 *    handleOrphanOptions: true
 * });
 * {
 *    param1: 'hello',
 *    world: [10, 'yop', 'hello world'],
 *    bool: true,
 *    hello: {
 *      world: 'Nelson'
 *    },
 *    help: 'coco yep',
 *    id: '#blop'
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseArgsString(string, settings = {}) {
    settings = __deepMerge({
        throw: true,
        definition: null,
        cast: true,
        complete: true,
        defaultObj: {}
    }, settings);
    const argsObj = {};
    const definition = settings.definition;
    // process the passed string
    let stringArray = string.match(/(?:[^\s"]+|"[^"]*")+/gm) || [];
    stringArray = stringArray.map((item) => {
        return __unquote(item);
    });
    if (!definition) {
        const argsObj = {};
        let currentArgName = -1;
        let currentValue;
        stringArray = stringArray.forEach((part) => {
            if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
                if (currentValue === undefined &&
                    currentArgName !== -1 &&
                    currentArgName) {
                    argsObj[currentArgName] = true;
                }
                currentArgName = part.replace(/^[-]{1,2}/, '');
            }
            else {
                currentValue = __parse(part);
                if (currentArgName !== undefined) {
                    argsObj[currentArgName] = __parse(currentValue);
                    currentValue = undefined;
                    currentArgName = undefined;
                }
            }
        });
        return argsObj;
    }
    let currentArgName = null;
    let rawArgsMap = {
        __orphan: []
    };
    stringArray = stringArray.forEach((part) => {
        const currentArg = part.replace(/^[-]{1,2}/, '');
        if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
            const realArgName = getArgNameByAlias(currentArg, definition) || currentArg;
            currentArgName = realArgName;
            if (rawArgsMap[currentArgName] === undefined) {
                rawArgsMap[currentArgName] = true;
            }
            if (settings.throw && !definition[realArgName]) {
                throw new Error(`You try to pass an argument "<yellow>${realArgName}</yellow>" that is not supported. Here's the supported arguments:\n${Object.keys(definition)
                    .map((argName) => {
                    const argDefinition = definition[argName];
                    let string = `<cyan>>${argName}</cyan>: --${argName}`;
                    if (argDefinition.alias)
                        string += ` (-${argDefinition.alias})`;
                    if (argDefinition.description)
                        string += `: ${argDefinition.description}`;
                    return string;
                })
                    .join('\n')}`);
            }
            // go to the next argument/value
            return;
        }
        // check if we have a current argument name
        if (currentArgName === null)
            currentArgName = '__orphan';
        // cast the value
        const value = __parse(part);
        // save the value into the raw args stack
        if (currentArgName === '__orphan') {
            rawArgsMap.__orphan.push(value);
        }
        else {
            if (rawArgsMap[currentArgName] !== undefined &&
                rawArgsMap[currentArgName] !== true) {
                if (!Array.isArray(rawArgsMap[currentArgName]))
                    rawArgsMap[currentArgName] = [rawArgsMap[currentArgName]];
                rawArgsMap[currentArgName].push(value);
            }
            else {
                rawArgsMap[currentArgName] = value;
            }
        }
    });
    let finalArgsMap = Object.assign({}, rawArgsMap);
    delete finalArgsMap.__orphan;
    // take care of orphan values
    if (settings.definition) {
        rawArgsMap.__orphan.forEach((value) => {
            for (let i = 0; i < Object.keys(settings.definition).length; i++) {
                const argName = Object.keys(settings.definition)[i];
                const definitionObj = settings.definition[argName];
                if (finalArgsMap[argName] !== undefined)
                    continue;
                if (__ofType(value, definitionObj.type) === true) {
                    finalArgsMap[argName] = value;
                    break;
                }
            }
        });
    }
    // cast params
    if (settings.cast === true) {
        finalArgsMap = __map(finalArgsMap, (key, value, idx) => {
            // validate and cast value
            if (settings.definition && settings.definition[key]) {
                const definitionObj = settings.definition[key];
                const sTypeInstance = new __SType(definitionObj.type);
                const res = sTypeInstance.cast(value, {
                    throw: settings.throw
                });
                if (res instanceof Error) {
                    return value;
                }
                return res;
            }
        });
    }
    if (settings.complete === true) {
        finalArgsMap = __completeArgsObject(finalArgsMap, settings);
    }
    return finalArgsMap;
}
function getArgNameByAlias(alias, definition) {
    const argNames = Object.keys(definition);
    for (let i = 0; i < argNames.length; i++) {
        const argDefinition = definition[argNames[i]];
        if (argDefinition.alias && argDefinition.alias === alias)
            return argNames[i];
    }
    return null;
}
export default parseArgsString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxLQUFLLE1BQU0saUJBQWlCLENBQUM7QUFFcEMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFPdEMsT0FBTyxvQkFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLFFBQVEsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM1QyxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxFQUFFO0tBQ2YsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBRXZDLDRCQUE0QjtJQUM1QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksWUFBWSxDQUFDO1FBQ2pCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUN6RCxJQUNFLFlBQVksS0FBSyxTQUFTO29CQUMxQixjQUFjLEtBQUssQ0FBQyxDQUFDO29CQUNyQixjQUFjLEVBQ2Q7b0JBQ0EsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDaEM7Z0JBQ0QsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLElBQUksY0FBYyxLQUFLLFNBQVMsRUFBRTtvQkFDaEMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDaEQsWUFBWSxHQUFHLFNBQVMsQ0FBQztvQkFDekIsY0FBYyxHQUFHLFNBQVMsQ0FBQztpQkFDNUI7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDMUIsSUFBSSxVQUFVLEdBQUc7UUFDZixRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUM7SUFFRixXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3pDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUN6RCxNQUFNLFdBQVcsR0FDZixpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDO1lBQzFELGNBQWMsR0FBRyxXQUFXLENBQUM7WUFFN0IsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUM1QyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ25DO1lBRUQsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM5QyxNQUFNLElBQUksS0FBSyxDQUNiLHdDQUF3QyxXQUFXLHNFQUFzRSxNQUFNLENBQUMsSUFBSSxDQUNsSSxVQUFVLENBQ1g7cUJBQ0UsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2YsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxQyxJQUFJLE1BQU0sR0FBRyxVQUFVLE9BQU8sY0FBYyxPQUFPLEVBQUUsQ0FBQztvQkFDdEQsSUFBSSxhQUFhLENBQUMsS0FBSzt3QkFBRSxNQUFNLElBQUksTUFBTSxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUM7b0JBQ2hFLElBQUksYUFBYSxDQUFDLFdBQVc7d0JBQzNCLE1BQU0sSUFBSSxLQUFLLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDN0MsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDaEIsQ0FBQzthQUNIO1lBQ0QsZ0NBQWdDO1lBQ2hDLE9BQU87U0FDUjtRQUVELDJDQUEyQztRQUMzQyxJQUFJLGNBQWMsS0FBSyxJQUFJO1lBQUUsY0FBYyxHQUFHLFVBQVUsQ0FBQztRQUV6RCxpQkFBaUI7UUFFakIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLHlDQUF5QztRQUN6QyxJQUFJLGNBQWMsS0FBSyxVQUFVLEVBQUU7WUFDakMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQ0UsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVM7Z0JBQ3hDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQ25DO2dCQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDNUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEM7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFFN0IsNkJBQTZCO0lBQzdCLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTO29CQUFFLFNBQVM7Z0JBQ2xELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNoRCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUM5QixNQUFNO2lCQUNQO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsY0FBYztJQUNkLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDMUIsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3JELDBCQUEwQjtZQUMxQixJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDcEMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2lCQUN0QixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO29CQUN4QixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxPQUFPLEdBQUcsQ0FBQzthQUNaO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7UUFDOUIsWUFBWSxHQUFHLG9CQUFvQixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM3RDtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRSxVQUFVO0lBQzFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxLQUFLLEtBQUs7WUFDdEQsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxlQUFlLGVBQWUsQ0FBQyJ9