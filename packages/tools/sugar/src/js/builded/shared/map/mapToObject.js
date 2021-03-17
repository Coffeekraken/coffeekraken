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
     * @name          mapToObject
     * @namespace     sugar.js.map
     * @type          Function
     *
     * This function simply take a Map object and convert it to a plain object
     *
     * @param       {Map}         map       The map object to convert into object
     * @return      {Object}                The plain object
     *
     * @example       js
     * import mapToObject from '@coffeekraken/sugar/js/map/mapToObject';
     * const myMap = new Map();
     * myMap.set('hello', 'world');
     * mapToObject(myMap);
     * // {
     * //   hello: 'world'
     * // }
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function mapToObject(map) {
        var obj = {};
        for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
            var _a = map_1[_i], k = _a[0], v = _a[1];
            obj[k] = v;
        }
        return obj;
    }
    exports.default = mapToObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG9PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvbWFwL21hcFRvT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFRO1FBQzNCLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQW1CLFVBQUcsRUFBSCxXQUFHLEVBQUgsaUJBQUcsRUFBSCxJQUFHO1lBQWIsSUFBQSxjQUFNLEVBQUwsQ0FBQyxRQUFBLEVBQUUsQ0FBQyxRQUFBO1lBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUFBO1FBQ25DLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9