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
        define(["require", "exports", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    var set_2 = __importDefault(require("./set"));
    /**
     * @name                      delete
     * @namespace           sugar.js.object
     * @type                      Function
     * @stable
     *
     * Delete an object property using a dotPath like "something.else"
     *
     * @param         {Object}          object            The object on which you want to delete the property
     * @param         {String}          dotPath           The dotpath to the property you want to delete
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import delete from '@coffeekraken/sugar/js/object/delete';
     * const myObject = {
     *    hello: 'world',
     *    plop: 'yop'
     * };
     * delete(myObject, 'plop');
     *
     * @since     2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function del(object, dotPath) {
        var parentDotPath = dotPath.split('.').slice(0, -1).join('.');
        if (!dotPath || dotPath === '' || dotPath === '.')
            return object;
        dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
        dotPath = dotPath.replace(/^\./, '');
        var a = dotPath.split('.');
        var o = object;
        var _loop_1 = function () {
            var n = a.shift();
            if (a.length < 1) {
                if (Array.isArray(o)) {
                    var valueToDelete_1 = o[n];
                    o = o.filter(function (v) {
                        return v !== valueToDelete_1;
                    });
                }
                else {
                    delete o[n];
                }
                set_2.default(object, parentDotPath, o);
            }
            else {
                o = o[n];
            }
        };
        while (a.length) {
            _loop_1();
        }
        return object;
    }
    return del;
});
