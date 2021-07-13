/**
*
* @name 		circleConstrain
* @namespace            js.geom.2d
* @type      Function
* @platform          js
* @platform          ts
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