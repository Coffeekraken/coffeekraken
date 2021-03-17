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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRGlyU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2ZzL2Vuc3VyZURpclN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0RBQTRCO0lBQzVCLGdGQUE0RDtJQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsYUFBYSxDQUFDLEdBQUc7UUFDeEIsR0FBRyxHQUFHLDJCQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLGtCQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==