// @ts-nocheck
// @shared
import distanceBetween from './distanceBetween';
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
    const dist = distanceBetween(center, point);
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
export default circleConstrain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlQ29uc3RyYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2lyY2xlQ29uc3RyYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUs7SUFDNUMsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDbEIsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNO1FBQ0wsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztTQUN6QyxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBQ0QsZUFBZSxlQUFlLENBQUMifQ==