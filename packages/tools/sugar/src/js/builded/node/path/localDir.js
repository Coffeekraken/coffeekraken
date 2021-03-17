var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../config/sugar", "fs-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-nocheck
    var sugar_1 = __importDefault(require("../config/sugar"));
    var fs_extra_1 = __importDefault(require("fs-extra"));
    /**
     * @name                            localDir
     * @namespace           sugar.node.fs
     * @type                            Function
     * @stable
     *
     * Return the .local directory path
     *
     * @return                {String}                      The path to the .local package directory path
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import localDir from '@coffeekraken/node/path/localDir';
     * localDir(); // => '/my/cool/path/.local'
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var fn = function () {
        var path = sugar_1.default('storage.localDir');
        fs_extra_1.default.ensureDirSync(path);
        return path;
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlL3BhdGgvbG9jYWxEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxjQUFjO0lBQ2QsMERBQTRDO0lBQzVDLHNEQUE0QjtJQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxJQUFNLEVBQUUsR0FBYztRQUNwQixJQUFNLElBQUksR0FBRyxlQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvQyxrQkFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztJQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9