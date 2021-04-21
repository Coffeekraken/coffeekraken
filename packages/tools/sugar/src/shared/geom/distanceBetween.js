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
     * @name 		distanceBetween
     * @namespace            js.geom.2d
     * @type      Function
     * @stable
     *
     * Get the distance between two points
     *
     * @param    {Point}    point1    The point 1, x and y value
     * @param    {Point}    point2    The point 2, x and y value
     * @return    {Number}    The distance between the two points
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import distanceBetween from '@coffeekraken/sugar/js/geom/2d/distanceBetween'
     * distanceBetween({
     * 	x: 10, y: 20
     * }, {
     * 	x: 10, y: 30
     * }) // 10
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function distanceBetween(point1, point2) {
        let xs = 0;
        let ys = 0;
        xs = point2.x - point1.x;
        xs = xs * xs;
        ys = point2.y - point1.y;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    }
    exports.default = distanceBetween;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGFuY2VCZXR3ZWVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzdGFuY2VCZXR3ZWVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNO1FBQ3JDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVYLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFYixFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRWIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Qsa0JBQWUsZUFBZSxDQUFDIn0=