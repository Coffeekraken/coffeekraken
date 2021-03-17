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
     * @name            folder
     * @namespace           sugar.node.is
     * @type            Function
     * @stable
     *
     * This function check if the passed string path is a folder or not
     *
     * @param     {String}        path        The path to check
     * @return    {Boolean}                   true if is a folder, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import isfolder from '@coffeekraken/sugar/node/is/folder';
     * isfolder('something/cool');
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isfolder(path, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            symlink: true
        }, settings);
        var isMatching = fs_1.default.existsSync(path);
        if (!isMatching)
            return false;
        if (settings.symlink && fs_1.default.lstatSync(path).isSymbolicLink()) {
            var realPath = fs_1.default.realpathSync(path);
            isMatching = isMatching && fs_1.default.lstatSync(realPath).isDirectory();
        }
        else {
            isMatching = isMatching && fs_1.default.lstatSync(path).isDirectory();
        }
        return isMatching;
    }
    exports.default = isfolder;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZS9pcy9mb2xkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMENBQXNCO0lBQ3RCLDRFQUF3RDtJQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDbkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsT0FBTyxFQUFFLElBQUk7U0FDZCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQUcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlCLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQzdELElBQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25FO2FBQU07WUFDTCxVQUFVLEdBQUcsVUFBVSxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0Q7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=