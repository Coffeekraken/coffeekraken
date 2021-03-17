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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wYXRoL2xvY2FsRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsY0FBYztJQUNkLDBEQUE0QztJQUM1QyxzREFBNEI7SUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsSUFBTSxFQUFFLEdBQWM7UUFDcEIsSUFBTSxJQUFJLEdBQUcsZUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0Msa0JBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7SUFDRixrQkFBZSxFQUFFLENBQUMifQ==