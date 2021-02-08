// @ts-nocheck
// @shared
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
        var str = func.toString();
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
        var start = str.indexOf('(') + 1;
        // End parameter names is just before last ')'
        var end = str.length - 1;
        var result = str.substring(start, end).split(', ');
        var params = [];
        result.forEach(function (element) {
            // Removing any default value
            element = element.replace(/=[\s\S]*/g, '').trim();
            if (element.length > 0)
                params.push(element);
        });
        return params;
    }
    return getArgsNames;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXJnc05hbWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QXJnc05hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxZQUFZLENBQUMsSUFBSTtRQUN4Qiw4Q0FBOEM7UUFDOUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLHdDQUF3QztRQUN4QyxtQ0FBbUM7UUFDbkMsc0NBQXNDO1FBQ3RDLDBDQUEwQztRQUMxQyxHQUFHLEdBQUcsR0FBRzthQUNOLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7YUFDaEMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7YUFDeEIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7YUFDeEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7YUFDbEIsSUFBSSxFQUFFLENBQUM7UUFFVix3Q0FBd0M7UUFDeEMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsOENBQThDO1FBQzlDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDckIsNkJBQTZCO1lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVsRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELE9BQVMsWUFBWSxDQUFDIn0=