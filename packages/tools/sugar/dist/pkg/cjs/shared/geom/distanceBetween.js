"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name 		distanceBetween
 * @namespace            js.geom.2d
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU07SUFDbkMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRVgsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6QixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUViLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFDRCxrQkFBZSxlQUFlLENBQUMifQ==