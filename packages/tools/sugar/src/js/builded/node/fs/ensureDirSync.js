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
        define(["require", "exports", "fs-extra", "../path/replacePathTokens"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_extra_1 = __importDefault(require("fs-extra"));
    var replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
    /**
     * @name        ensureDirSync
     * @namespace           sugar.node.fs
     * @type          Function
     * @stable
     *
     * Ensure that the passed directory exists. If not, will be created recursively... (sync)
     * Support the ```replacePathTokens``` tokens
     *
     * @param       {String}              dir           The directory to ensure that it exists...
     * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import ensureDirSync from '@coffeekraken/node/fs/ensureDirSync';
     * try {
     *    ensureDirSync('my/cool/dir');
     * } catch(e) {}
     *
     * @see             https://github.com/jprichardson/node-fs-extra
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ensureDirSync(dir) {
        dir = replacePathTokens_1.default(dir);
        fs_extra_1.default.ensureDirSync(dir);
    }
    exports.default = ensureDirSync;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRGlyU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGUvZnMvZW5zdXJlRGlyU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBNEI7SUFDNUIsZ0ZBQTREO0lBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRztRQUN4QixHQUFHLEdBQUcsMkJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0Isa0JBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9