// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "is-valid-path"], factory);
    }
})(function (require, exports) {
    "use strict";
    var is_valid_path_1 = __importDefault(require("is-valid-path"));
    /**
     * @name                            path
     * @namespace           node.is
     * @type                            Function
     * @stable
     *
     * Check if the passed string is a valid path or not
     *
     * @param         {String}            path              The path to check
     * @return        {Boolean}                             true if the path is valide, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isPath from '@coffeekraken/sugar/js/is/path';
     * isPath('hello/world'); // => true
     *
     * @since           1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function path(path) {
        // check if the path is valid or not
        if (!is_valid_path_1.default(path))
            return false;
        // otherwise, all is ok
        return true;
    }
    return path;
});
