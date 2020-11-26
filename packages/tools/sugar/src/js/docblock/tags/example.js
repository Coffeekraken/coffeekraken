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
     * @name              example
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @wip
     *
     * Parse the example tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @example      {Object}                      The formated object
     *
     * @todo        interface
     * @todo        doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function example(data) {
        if (!Array.isArray(data))
            data = [data];
        data = data
            .map(function (item) {
            if (item.content && item.content[item.content.length - 1] === '') {
                item.content = item.content.slice(0, -1);
            }
            if (!item.content)
                return null;
            return {
                language: typeof item.value === 'string'
                    ? item.value.toLowerCase()
                    : item.value,
                code: Array.isArray(item.content)
                    ? item.content.join('\n').trim().replace(/\\@/, '@')
                    : item.content.replace(/\\@/, '@')
            };
        })
            .filter(function (item) { return item !== null; });
        return data;
    }
    return example;
});
