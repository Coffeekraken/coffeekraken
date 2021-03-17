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
        define(["require", "exports", "fs", "../../shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = __importDefault(require("fs"));
    var deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    /**
     * @name            file
     * @namespace           sugar.node.is
     * @type            Function
     * @stable
     *
     * This function check if the passed string path is a file or not
     *
     * @param     {String}        path        The path to check
     * @return    {Boolean}                   true if is a file, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import isFile from '@coffeekraken/sugar/node/is/file';
     * isFile('something/cool');
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isFile(path, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            symlink: true
        }, settings);
        var isMatching = fs_1.default.existsSync(path);
        if (!isMatching)
            return false;
        if (settings.symlink && fs_1.default.lstatSync(path).isSymbolicLink()) {
            var realPath = fs_1.default.realpathSync(path);
            isMatching = isMatching && fs_1.default.lstatSync(realPath).isFile();
        }
        else {
            isMatching = isMatching && fs_1.default.lstatSync(path).isFile();
        }
        return isMatching;
    }
    exports.default = isFile;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2lzL2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMENBQXNCO0lBQ3RCLDRFQUF3RDtJQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDakMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsT0FBTyxFQUFFLElBQUk7U0FDZCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQUcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlCLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQzdELElBQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlEO2FBQU07WUFDTCxVQUFVLEdBQUcsVUFBVSxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=