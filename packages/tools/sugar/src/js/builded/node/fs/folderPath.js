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
        define(["require", "exports", "./isPath", "../path/replacePathTokens"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isPath_1 = __importDefault(require("./isPath"));
    var replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
    /**
     * @name                folderPath
     * @namespace           sugar.node.fs
     * @type                Function
     * @stable
     *
     * This function returns you the folder path of the file path passed.
     * You can tell the function to check for file existence before getting
     * the folder path with the second parameter.
     * Support the ```replacePathTokens``` tokens
     *
     * @param           {String}            path            The file path to get folder path from
     * @param           {Boolean}        [checkExistence=false]        Specify if you want to check the file existence before
     * @return          {String|Boolean}                    The folder path or false if not exists
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import folderPath from '@coffeekraken/sugar/node/fs/folderPath';
     * folderPath('my/cool/path.js'); // => true
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function folderPath(path, checkExistence) {
        if (checkExistence === void 0) { checkExistence = false; }
        path = replacePathTokens_1.default(path);
        if (checkExistence) {
            if (!isPath_1.default(path, true))
                return false;
        }
        var parts = path.split('/');
        if (parts.length <= 1) {
            return '';
        }
        return parts.slice(0, -1).join('/');
    }
    exports.default = folderPath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGUvZnMvZm9sZGVyUGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvREFBZ0M7SUFDaEMsZ0ZBQTREO0lBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQXNCO1FBQXRCLCtCQUFBLEVBQUEsc0JBQXNCO1FBQzlDLElBQUksR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3pDO1FBQ0QsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==