// shared
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
     * @name              booleanTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "boolean" with some utilities methods like "is", "cast", etc...
     *
     * @example         js
     * export default {
     *    name: 'String',
     *    id: 'string',
     *    is: (value) => typeof value === 'string',
     *    cast: (value) => '' + value,
     *    // etc...
     * };
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var descriptor = {
        name: 'Boolean',
        id: 'boolean',
        is: function (value) { return typeof value === 'boolean'; },
        cast: function (value) {
            if (value === null || value === undefined)
                return false;
            if (typeof value === 'number') {
                if (value > 0)
                    return true;
                return false;
            }
            if (typeof value === 'string') {
                return value.length > 0 ? true : false;
            }
            if (Array.isArray(value)) {
                if (value.length > 0)
                    return true;
                return false;
            }
            if (typeof value === 'object') {
                return Object.keys(value).length > 0 ? true : false;
            }
            return new Error([
                "Sorry but for now only these types can be casted to boolean:",
                '- <yellow>null</yellow>: Will be casted as <red>false</red>',
                '- <yellow>undefined</yellow>: Will be casted as <red>false</red>',
                '- <yellow>Number</yellow>: Will be casted as <green>true</green> when greater than 0, <red>false</red> otherwise',
                '- <yellow>String</yellow>: Will be casted as <green>true</green> when longer than 0 characters, <red>false</red> otherwise',
                '- <yellow>Array</yellow>: Will be casted as <green>true</green> when having more than 0 items, <red>false</red> otherwise',
                '- <yellow>Object</yellow>: Will be casted as <green>true</green> when have more than 0 properties, <red>false</red> otherwise'
            ].join('\n'));
        }
    };
    return descriptor;
});
