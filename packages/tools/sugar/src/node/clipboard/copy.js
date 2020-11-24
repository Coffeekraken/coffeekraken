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
        define(["require", "exports", "clipboardy", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var clipboardy_1 = __importDefault(require("clipboardy"));
    var toString_1 = __importDefault(require("../string/toString"));
    /**
     * @name            copy
     * @namespace       sugar.node.clipboard
     * @type            Function
     * @stable
     *
     * Simple function to copy things into the system clipboard.
     * This is using https://www.npmjs.com/package/clipboardy under the hood.
     *
     * @param       {String}      text        The text to copy
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import copy from '@coffeekraken/sugar/node/clipboard/copy';
     * copy('Hello world');
     *
     * @since       2.0.0
     * @see         https://www.npmjs.com/package/clipboardy
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function copy(text) {
        text = toString_1.default(text);
        clipboardy_1.default.writeSync(text);
    }
    return copy;
});
