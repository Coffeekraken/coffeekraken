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
     * @name              getMethods
     * @namespace            js.class
     * @type              Function
     * @stable
     *
     * This function take an instance as parameter and return all the methods in array format
     *
     * @param         {Object}        instance        The instance of the object to get the methods names of
     * @return        {Array}                         A simple array of all the methods names
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import getMethods from '@coffeekraken/sugar/js/class/getMethods';
     * myClass {
     *  constructor() {}
     *  hello() {}
     *  world() {}
     * }
     * const myInstance = new myClass();
     * getMethods(myInstance); // => ['hello','world']
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getMethods(toCheck) {
        let props = [];
        let obj = toCheck;
        do {
            const _props = Object.getOwnPropertyNames(obj);
            if (_props.indexOf('__defineGetter__') !== -1)
                continue;
            props = props.concat(_props);
        } while ((obj = Object.getPrototypeOf(obj)));
        return props.sort().filter(function (e, i, arr) {
            if (e != arr[i + 1] && typeof toCheck[e] == 'function')
                return true;
        });
    }
    exports.default = getMethods;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldE1ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsVUFBVSxDQUFDLE9BQU87UUFDekIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLEdBQUc7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFFLFNBQVM7WUFDeEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUIsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFFN0MsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVTtnQkFBRSxPQUFPLElBQUksQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==