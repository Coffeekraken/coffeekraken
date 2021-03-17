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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvZnMvaXNQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUEwQztJQUMxQywwQ0FBc0I7SUFDdEIsZ0ZBQTREO0lBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBc0I7UUFBdEIsK0JBQUEsRUFBQSxzQkFBc0I7UUFDMUMsSUFBSSxHQUFHLDJCQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV0QyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLHVCQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFdkMseUNBQXlDO1FBQ3pDLElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUMxQztRQUVELHVCQUF1QjtRQUN2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxNQUFNLENBQUMifQ==