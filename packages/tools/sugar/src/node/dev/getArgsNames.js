"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                            getArgsNames
 * @namespace           sugar.js.dev
 * @type                            Function
 * @status              wip
 *
 * Get the arguments names of the passed function. Return an array of the arguments names
 *
 * @param             {Function}              func                  The function reference of which get the arguments names
 * @return            {Array}                                       An array of arguments names
 *
 * @todo        interface
 * @todo        doc
 * @todo        move this into the "function" folder
 *
 * @example         js
 * import getArgsNames from '@coffeekraken/sugar/js/dev/getArgsNames';
 * function hello(world, coco, plop) { }
 * getArgsNames(hello); // => ['world', 'coco', 'plop']
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getArgsNames(func) {
    // String representaation of the function code
    let str = func.toString();
    // Remove comments of the form /* ... */
    // Removing comments of the form //
    // Remove body of the function { ... }
    // removing '=>' if func is arrow function
    str = str
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/(.)*/g, '')
        .replace(/{[\s\S]*}/, '')
        .replace(/=>/g, '')
        .trim();
    // Start parameter names after first '('
    const start = str.indexOf('(') + 1;
    // End parameter names is just before last ')'
    const end = str.length - 1;
    const result = str.substring(start, end).split(', ');
    const params = [];
    result.forEach((element) => {
        // Removing any default value
        element = element.replace(/=[\s\S]*/g, '').trim();
        if (element.length > 0)
            params.push(element);
    });
    return params;
}
exports.default = getArgsNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXJnc05hbWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QXJnc05hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsWUFBWSxDQUFDLElBQUk7SUFDeEIsOENBQThDO0lBQzlDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQix3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLHNDQUFzQztJQUN0QywwQ0FBMEM7SUFDMUMsR0FBRyxHQUFHLEdBQUc7U0FDTixPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1NBQ2hDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1NBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1NBQ3hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQ2xCLElBQUksRUFBRSxDQUFDO0lBRVYsd0NBQXdDO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLDhDQUE4QztJQUM5QyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUUzQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWxCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN6Qiw2QkFBNkI7UUFDN0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWxELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==