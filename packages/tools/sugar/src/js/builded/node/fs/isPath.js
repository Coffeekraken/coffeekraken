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
        define(["require", "exports", "is-valid-path", "fs", "../path/replacePathTokens"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_valid_path_1 = __importDefault(require("is-valid-path"));
    var fs_1 = __importDefault(require("fs"));
    var replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
    /**
     * @name                            isPath
     * @namespace           sugar.node.fs
     * @type                            Function
     * @stable
     *
     * Check if the passed string is a valid path or not
     * Support the ```replacePathTokens``` tokens
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
     * import isPath from '@coffeekraken/sugar/node/fs/isPath';
     * isPath('hello/world'); // => true
     *
     * @see       https://www.npmjs.com/package/is-valid-path
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isPath(path, checkExistence) {
        if (checkExistence === void 0) { checkExistence = false; }
        path = replacePathTokens_1.default(path);
        // check if we have some /
        if (!path.includes('/'))
            return false;
        // check if the path is valid or not
        if (!is_valid_path_1.default(path))
            return false;
        // if we have to check the path existence
        if (checkExistence) {
            if (!fs_1.default.existsSync(path))
                return false;
        }
        // otherwise, all is ok
        return true;
    }
    exports.default = isPath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZS9mcy9pc1BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0VBQTBDO0lBQzFDLDBDQUFzQjtJQUN0QixnRkFBNEQ7SUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFzQjtRQUF0QiwrQkFBQSxFQUFBLHNCQUFzQjtRQUMxQyxJQUFJLEdBQUcsMkJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXRDLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsdUJBQWEsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV2Qyx5Q0FBeUM7UUFDekMsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQzFDO1FBRUQsdUJBQXVCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9