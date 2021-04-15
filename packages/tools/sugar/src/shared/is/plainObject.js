// @ts-nocheck
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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name                      plainObject
     * @namespace           sugar.js.is
     * @type                      Function
     * @stable
     *
     * Check if the passed object (or array of objects) is/are plain object(s)
     *
     * @param         {Object|Array}            object                  The object(s) to check
     * @return        {Boolean}                                         true if is plain object(s), false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import isPlainObject from '@coffeekraken/sugar/js/is/plainObject';
     * isPlainObject({ hello: 'world'}); // => true
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function plainObject(object) {
        if (!object)
            return false;
        if (typeof object !== 'object')
            return false;
        if (object.constructor && object.constructor.name !== 'Object')
            return false;
        if (Object.prototype.toString.call(object) !== '[object Object]')
            return false;
        if (object !== Object(object))
            return false;
        // if (object.constructor !== Object) return false;
        return true;
    }
    exports.default = plainObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW5PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGFpbk9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFJZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxXQUFXLENBQUMsTUFBTTtRQUN6QixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzFCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzdDLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDN0UsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssaUJBQWlCO1lBQzlELE9BQU8sS0FBSyxDQUFDO1FBQ2YsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVDLG1EQUFtRDtRQUNuRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==