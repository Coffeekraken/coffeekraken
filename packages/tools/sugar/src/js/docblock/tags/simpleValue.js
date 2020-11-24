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
     * @name              simpleValue
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @wip
     *
     * Parse the simpleValue tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @return      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function simpleValue(data) {
        if (data &&
            data.value &&
            typeof data.value === 'string' &&
            data.value.trim() === '') {
            return true;
        }
        return data.value;
    }
    return simpleValue;
});
