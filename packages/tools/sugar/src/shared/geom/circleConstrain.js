// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./distanceBetween"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const distanceBetween_1 = __importDefault(require("./distanceBetween"));
    /**
     * @name 		circleConstrain
     * @namespace           sugar.js.geom.2d
     * @type      Function
     * @stable
     *
     * Take as parameter a central point, a radius and a points to constrain inside the circle defined by the radius
     *
     * @param    {Vector2}    center    The center point of the circle
     * @param    {Number}    radius    The radius to constrain the point in
     * @param    {Vector2}    point    The point to constrain
     * @return    {Vector2}    The new constrained value for the point
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import circleConstrain from '@coffeekraken/sugar/js/geom/2d/circleConstrain'
     * circleConstrain({
     * 	x: 10, y: 10
     * }, 10, {
     * 	x: 10, y: 5
     * })
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     * @since       2.0.0
     * @see    https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle
     */
    function circleConstrain(center, radius, point) {
        const dist = distanceBetween_1.default(center, point);
        if (dist <= radius) {
            return point;
        }
        else {
            const x = point.x - center.x;
            const y = point.y - center.y;
            const radians = Math.atan2(y, x);
            return {
                x: Math.cos(radians) * radius + center.x,
                y: Math.sin(radians) * radius + center.y
            };
        }
    }
    exports.default = circleConstrain;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlQ29uc3RyYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2lyY2xlQ29uc3RyYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFnRDtJQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUNILFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSztRQUM1QyxNQUFNLElBQUksR0FBRyx5QkFBZSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQyxPQUFPO2dCQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO2FBQ3pDLENBQUM7U0FDSDtJQUNILENBQUM7SUFDRCxrQkFBZSxlQUFlLENBQUMifQ==