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
        const obj = {};
        for (let [k, v] of map)
            obj[k] = v;
        return obj;
    }
    exports.default = mapToObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG9PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBUb09iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFRO1FBQzNCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHO1lBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==