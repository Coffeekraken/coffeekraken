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
    /**
     * @name                            getArgsNames
     * @namespace           sugar.js.dev
     * @type                            Function
     * @wip
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
