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
        define(["require", "exports", "find-package-json"], factory);
    }
})(function (require, exports) {
    "use strict";
    var find_package_json_1 = __importDefault(require("find-package-json"));
    /**
     * @name                    packageRoot
     * @namespace           sugar.node.path
     * @type                    Function
     *
     * Return the path to either the first finded package root going up the folders, or the highest package root finded
     *
     * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
     * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
     * @return          {String}                                      The finded package path or false if not finded
     *
     * @example         js
     * import packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
     * const root = packageRoot();
     *
     * @see       https://www.npmjs.com/package/find-package-json
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function packageRoot(from, highest) {
        if (from === void 0) { from = process.cwd(); }
        if (highest === void 0) { highest = false; }
        var f = find_package_json_1.default(from);
        var file = f.next();
        if (!highest) {
            var filename = file.filename || false;
            if (!filename)
                return filename;
            return filename.split('/').slice(0, -1).join('/');
        }
        var finalFile;
        while (!file.done) {
            if (file.done)
                break;
            finalFile = file;
            file = f.next();
        }
        if (finalFile.filename) {
            return finalFile.filename.split('/').slice(0, -1).join('/');
        }
        return false;
    }
    return packageRoot;
});
