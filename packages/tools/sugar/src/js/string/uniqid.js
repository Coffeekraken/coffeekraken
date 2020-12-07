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
        define(["require", "exports", "uniqid"], factory);
    }
})(function (require, exports) {
    "use strict";
    var uniqid_1 = __importDefault(require("uniqid"));
    /**
     * @name          uniqid
     * @namespace           sugar.js.string
     * @type          Function
     * @stable
     *
     * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
     *
     * @return          {String}                A 8 bytes uniqid string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import uniqid from '@coffeekraken/sugar/js/string/uniqid';
     * console.log(uniqid()); // => 4n5pxq24
     *
     * @see       https://www.npmjs.com/package/uniqid
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function uniqid() {
        return uniqid_1.default();
    }
    return uniqid;
});
//# sourceMappingURL=uniqid.js.map