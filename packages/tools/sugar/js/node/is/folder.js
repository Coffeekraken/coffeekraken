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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvaXMvZm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBDQUFzQjtJQUN0Qiw0RUFBd0Q7SUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ25DLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE9BQU8sRUFBRSxJQUFJO1NBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksVUFBVSxHQUFHLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM5QixJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksWUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUM3RCxJQUFNLFFBQVEsR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLFVBQVUsR0FBRyxVQUFVLElBQUksWUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuRTthQUFNO1lBQ0wsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQy9EO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9