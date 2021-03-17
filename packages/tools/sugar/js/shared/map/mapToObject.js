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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG9PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL21hcC9tYXBUb09iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxXQUFXLENBQUMsR0FBUTtRQUMzQixJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixLQUFtQixVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztZQUFiLElBQUEsY0FBTSxFQUFMLENBQUMsUUFBQSxFQUFFLENBQUMsUUFBQTtZQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBQTtRQUNuQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==