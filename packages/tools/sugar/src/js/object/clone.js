// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash.clone", "lodash.clonedeep"], factory);
    }
})(function (require, exports) {
    "use strict";
    var lodash_clone_1 = __importDefault(require("lodash.clone"));
    var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
    /**
     * @name                clone
     * @namespace           sugar.js.object
     * @type                Function
     * @stable
     *
     * This function allows you to clone an object either at 1 level, or deeply.
     *
     * @param       {Object}        object        The object to copy
     * @param       {Object}       [settings={}]   Specify some settings to configure your clone process
     * @return      {Object}                      The cloned object
     *
     * @setting     {Boolean}       [deep=false]      Specify if you want to clone the object deeply
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import clone from '@coffeekraken/sugar/js/object/clone';
     * clone({
     *    hello: 'world'
     * });
     *
     * @see       https://www.npmjs.com/package/lodash
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function clone(object, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ deep: false }, settings);
        if (settings.deep) {
            return lodash_clonedeep_1.default(object);
        }
        return lodash_clone_1.default(object);
    }
    return clone;
});
//# sourceMappingURL=clone.js.map