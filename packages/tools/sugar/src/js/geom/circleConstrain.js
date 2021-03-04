// @ts-nocheck
// @shared
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
    var distanceBetween_1 = __importDefault(require("./distanceBetween"));
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
        var dist = distanceBetween_1.default(center, point);
        if (dist <= radius) {
            return point;
        }
        else {
            var x = point.x - center.x;
            var y = point.y - center.y;
            var radians = Math.atan2(y, x);
            return {
                x: Math.cos(radians) * radius + center.x,
                y: Math.sin(radians) * radius + center.y
            };
        }
    }
    exports.default = circleConstrain;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlQ29uc3RyYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2lyY2xlQ29uc3RyYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixzRUFBZ0Q7SUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUs7UUFDNUMsSUFBTSxJQUFJLEdBQUcseUJBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ2xCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsT0FBTztnQkFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQzthQUN6QyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsZUFBZSxDQUFDIn0=