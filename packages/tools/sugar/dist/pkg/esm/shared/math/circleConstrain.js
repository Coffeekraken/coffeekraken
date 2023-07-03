// @ts-nocheck
import distanceBetween from './distanceBetween';
/**
 * @name 		circleConstrain
 * @namespace            shared.math
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
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
 * @snippet         __circleConstrain($1, $1)
 * __circleConstain({
 *      x: $1, y: $2
 * }, $3, {
 *      x: $4, y: $5
 * })
 *
 * @example    js
 * import { __circleConstrain } from '@coffeekraken/sugar/math'
 * __circleConstrain({
 * 	x: 10, y: 10
 * }, 10, {
 * 	x: 10, y: 5
 * })
 *
 * @see    https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __circleConstrain(center, radius, point) {
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
            y: Math.sin(radians) * radius + center.y,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLO0lBQzNELE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO1NBQU07UUFDSCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU87WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQzNDLENBQUM7S0FDTDtBQUNMLENBQUMifQ==