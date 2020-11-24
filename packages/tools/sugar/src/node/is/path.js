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
        define(["require", "exports", "../fs/isPath"], factory);
    }
})(function (require, exports) {
    "use strict";
    var isPath_1 = __importDefault(require("../fs/isPath"));
    /**
     * @name                            path
     * @namespace           sugar.node.is
     * @type                            Function
     * @stable
     *
     * Check if the passed string is a valid path or not
     *
     * @param         {String}            path              The path to check
     * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
     * @return        {Boolean}                             true if the path is valide, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isPath from '@coffeekraken/sugar/node/is/path';
     * isPath('hello/world'); // => true
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function path(path, checkExistence) {
        if (checkExistence === void 0) { checkExistence = false; }
        return isPath_1.default(path, checkExistence);
    }
    return path;
});
