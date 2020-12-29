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
        define(["require", "exports", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    var unquote_1 = __importDefault(require("../string/unquote"));
    /**
     * @name                          get
     * @namespace           sugar.js.object
     * @type                          Function
     * @stable
     *
     * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
     *
     * @param               {Object}                 obj                The object in which to set the value
     * @param               {String}                path                The dotted object path to get
     * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import get from '@coffeekraken/sugar/js/object/get';
     * get('myObject.cool.value'); // => 'Hello world'
     *
     * @since     2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function get(obj, path, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({}, settings);
        if (obj[path] !== undefined)
            return obj[path];
        if (!path || path === '' || path === '.')
            return obj;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        var a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map(function (p) { return unquote_1.default(p); });
        var o = obj;
        while (a.length) {
            var n = a.shift();
            if (typeof o !== 'object')
                return;
            if (!(n in o))
                return;
            o = o[n];
        }
        return o;
    }
    return get;
});
//# sourceMappingURL=get.js.map