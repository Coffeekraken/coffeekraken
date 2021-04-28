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
     * @namespace            js.is
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW5PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2lzL3BsYWluT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUlkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxNQUFNO1FBQ3pCLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDN0MsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM3RSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxpQkFBaUI7WUFDOUQsT0FBTyxLQUFLLENBQUM7UUFDZixJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUMsbURBQW1EO1FBQ25ELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9