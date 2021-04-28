// @ts-nocheck
/**
 * @name            rgba2hsv
 * @namespace            js.color
 * @type            Function
 * @stable
 *
 * RGBA to HSV
 *
 * @param       	{Number|Object}        	r 	          	The red value between 0-255 or an object representing r, g, b, a
 * @param       	{Number}        	g 	          	The green value between 0-255
 * @param       	{Number}        	b 	          	The blue value between 0-255
 * @param       	{Number}        	a 	          	The alpha value between 0-100|0-1
 * @return      	{object} 		                    	The hsv object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import rgba2hsv from '@coffeekraken/sugar/js/color/rgba2hsv';
 * rgba2hsv(10,20,50,10);
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rgba2hsv(r, g, b, a = 1) {
    if (typeof r === 'object') {
        g = r.g;
        b = r.b;
        a = r.a;
        r = r.r;
    }
    const min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min;
    let h, s, v = max;
    v = Math.floor((max / 255) * 100);
    if (max != 0)
        s = Math.floor((delta / max) * 100);
    else {
        // black
        return [0, 0, 0];
    }
    if (r == max)
        h = (g - b) / delta;
    // between yellow & magenta
    else if (g == max)
        h = 2 + (b - r) / delta;
    // between cyan & yellow
    else
        h = 4 + (r - g) / delta; // between magenta & cyan
    h = Math.floor(h * 60); // degrees
    if (h < 0)
        h += 360;
    return {
        h: h,
        s: s,
        v: v
    };
}
export default rgba2hsv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmdiYTJoc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZ2JhMmhzdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3pCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1Q7SUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3ZCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxFQUNILENBQUMsRUFDRCxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRVYsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDbEMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO1FBQ0gsUUFBUTtRQUNSLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsSUFBSSxDQUFDLElBQUksR0FBRztRQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbEMsMkJBQTJCO1NBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUc7UUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQyx3QkFBd0I7O1FBQ25CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMseUJBQXlCO0lBRXZELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVU7SUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFFLENBQUMsSUFBSSxHQUFHLENBQUM7SUFFcEIsT0FBTztRQUNMLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztLQUNMLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==