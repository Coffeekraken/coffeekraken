// @ts-nocheck
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
    /**
     * @name            rgba2hsv
     * @namespace           sugar.js.color
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
    function rgba2hsv(r, g, b, a) {
        if (a === void 0) { a = 1; }
        if (typeof r === 'object') {
            g = r.g;
            b = r.b;
            a = r.a;
            r = r.r;
        }
        var min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min;
        var h, s, v = max;
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
    return rgba2hsv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmdiYTJoc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZ2JhMmhzdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBSztRQUFMLGtCQUFBLEVBQUEsS0FBSztRQUM5QixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUN6QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNUO1FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN2QixLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsRUFDSCxDQUFDLEVBQ0QsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVWLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksR0FBRyxJQUFJLENBQUM7WUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUM3QztZQUNILFFBQVE7WUFDUixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUc7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLDJCQUEyQjthQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHO1lBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0Msd0JBQXdCOztZQUNuQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLHlCQUF5QjtRQUV2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFBRSxDQUFDLElBQUksR0FBRyxDQUFDO1FBRXBCLE9BQU87WUFDTCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBQ0osQ0FBQztJQUNELE9BQVMsUUFBUSxDQUFDIn0=