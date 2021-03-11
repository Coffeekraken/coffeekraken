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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name              getMethods
     * @namespace           sugar.js.class
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
        var props = [];
        var obj = toCheck;
        do {
            var _props = Object.getOwnPropertyNames(obj);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldE1ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxPQUFPO1FBQ3pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNsQixHQUFHO1lBQ0QsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxTQUFTO1lBQ3hELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBRTdDLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRztZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxJQUFJLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=