// @ts-nocheck
// @shared
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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = path;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGdFQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSTtRQUNoQixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLHVCQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdkMsdUJBQXVCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLElBQUksQ0FBQyJ9