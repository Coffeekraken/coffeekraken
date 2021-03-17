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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGUvaXMvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwQ0FBc0I7SUFDdEIsNEVBQXdEO0lBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUNqQyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxPQUFPLEVBQUUsSUFBSTtTQUNkLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLFVBQVUsR0FBRyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDOUIsSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDN0QsSUFBTSxRQUFRLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxVQUFVLEdBQUcsVUFBVSxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDOUQ7YUFBTTtZQUNMLFVBQVUsR0FBRyxVQUFVLElBQUksWUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxRDtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxrQkFBZSxNQUFNLENBQUMifQ==