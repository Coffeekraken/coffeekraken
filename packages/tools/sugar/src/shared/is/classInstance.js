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
     * @name        isClassInstance
     * @namespace            shared.is
     * @type         Function
     *
     * Check if the passed item is an object class and not a plain object.
     *
     * @param       {Any}           object          The object to check
     * @return      {Boolean}                           true if is an custom object instance, false if not
     *
     * @example         js
     * import isClassInstance from '@coffeekraken/sugar/shared/is/classInstance';
     * if (isClassInstance({
     *      something: 'hello'
     * })); // => false
     * class MyClass {
     *      constructor() {}
     * }
     * if (isClassInstance(new MyClass())); // => true
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function classInstance(object) {
        if (!object)
            return false;
        if (typeof object !== 'object')
            return false;
        if (object.constructor && object.constructor.name === 'Object')
            return false;
        if (Object.prototype.toString.call(object) === '[object Object]')
            return false;
        if (object.constructor === Object)
            return false;
        return true;
    }
    exports.default = classInstance;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NJbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzSW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQXdCLGFBQWEsQ0FBQyxNQUFNO1FBQzFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDN0MsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM3RSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxpQkFBaUI7WUFDOUQsT0FBTyxLQUFLLENBQUM7UUFDZixJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVJELGdDQVFDIn0=