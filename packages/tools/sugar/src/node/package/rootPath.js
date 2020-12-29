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
        define(["require", "exports", "../path/packageRoot"], factory);
    }
})(function (require, exports) {
    "use strict";
    var packageRoot_1 = __importDefault(require("../path/packageRoot"));
    /**
     * @name          rootPath
     * @namespace     sugar.node.package
     * @type          Function
     * @beta
     *
     * This function return the absolute path of your current working package
     *
     * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
     * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
     * @return    {String}          The current working package root path
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import json from '@coffeekraken/sugar/node/package/rootPath';
     * rootPath(); => // /something/cool/myCoolPackage'
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    function rootPath(from, highest) {
        if (from === void 0) { from = process.cwd(); }
        if (highest === void 0) { highest = false; }
        return packageRoot_1.default(from, highest);
    }
    return rootPath;
});
//# sourceMappingURL=rootPath.js.map