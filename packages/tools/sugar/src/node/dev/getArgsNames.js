"use strict";
// @ts-nocheck
// @shared
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
module.exports = getArgsNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXJnc05hbWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QXJnc05hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxZQUFZLENBQUMsSUFBSTtJQUN4Qiw4Q0FBOEM7SUFDOUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsc0NBQXNDO0lBQ3RDLDBDQUEwQztJQUMxQyxHQUFHLEdBQUcsR0FBRztTQUNOLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7U0FDaEMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7U0FDeEIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7U0FDeEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7U0FDbEIsSUFBSSxFQUFFLENBQUM7SUFFVix3Q0FBd0M7SUFDeEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkMsOENBQThDO0lBQzlDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVyRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3pCLDZCQUE2QjtRQUM3QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNELGlCQUFTLFlBQVksQ0FBQyJ9