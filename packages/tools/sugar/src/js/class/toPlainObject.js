// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name                          toPlainObject
     * @namespace          sugar.js.class
     * @type                          Function
     * @stable
     *
     * This function take a instance as parameter and return a plain object of it
     *
     * @param               {Mixed}               instance                Any class instance to transform into a plain object
     * @return              {Object}                                      A plain object version of the the class instance
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import toPlainObject from '@coffeekraken/sugar/js/class/toPlainObject';
     * class Coco {
     *    constructor() {
     *      this.hello = 'world';
     *    }
     * }
     * toPlainObject(new Coco()); // => { hello: 'world' }
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    function toPlainObject(theClass) {
        var originalClass = theClass || {};
        var keys = Object.getOwnPropertyNames(originalClass);
        return keys.reduce(function (classAsObj, key) {
            classAsObj[key] = originalClass[key];
            return classAsObj;
        }, {});
    }
    return toPlainObject;
});
