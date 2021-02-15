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
    exports.default = getArgsNames;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXJnc05hbWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QXJnc05hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsWUFBWSxDQUFDLElBQUk7UUFDeEIsOENBQThDO1FBQzlDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQix3Q0FBd0M7UUFDeEMsbUNBQW1DO1FBQ25DLHNDQUFzQztRQUN0QywwQ0FBMEM7UUFDMUMsR0FBRyxHQUFHLEdBQUc7YUFDTixPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO2FBQ2hDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2FBQ2xCLElBQUksRUFBRSxDQUFDO1FBRVYsd0NBQXdDO1FBQ3hDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLDhDQUE4QztRQUM5QyxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUzQixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3JCLDZCQUE2QjtZQUM3QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFbEQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBZSxZQUFZLENBQUMifQ==