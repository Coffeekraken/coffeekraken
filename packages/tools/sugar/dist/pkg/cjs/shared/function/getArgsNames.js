"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                            getArgsNames
 * @namespace           shared.function
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status              beta
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
 * import getArgsNames from '@coffeekraken/sugar/shared/function/getArgsNames';
 * function hello(world, coco, plop) { }
 * getArgsNames(hello); // => ['world', 'coco', 'plop']
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxJQUFJO0lBQ3RCLDhDQUE4QztJQUM5QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsd0NBQXdDO0lBQ3hDLG1DQUFtQztJQUNuQyxzQ0FBc0M7SUFDdEMsMENBQTBDO0lBQzFDLEdBQUcsR0FBRyxHQUFHO1NBQ0osT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQztTQUNoQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztTQUN4QixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztTQUN4QixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztTQUNsQixJQUFJLEVBQUUsQ0FBQztJQUVaLHdDQUF3QztJQUN4QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVuQyw4Q0FBOEM7SUFDOUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFM0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVsQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdkIsNkJBQTZCO1FBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=