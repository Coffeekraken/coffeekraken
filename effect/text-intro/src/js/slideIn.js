import __whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
import __querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'

/**
 * @name      slideIn
 * @namespace       text-intro
 * @type        Function
 *
 * Init the listener for the "slide-in-" intro to work
 * Supported slides animation directions
 * - up
 * - right
 * - left
 * - down
 *
 * @param    {Integer}    [offset=-window.innerHeight*.2]    An offset that represent the distance before entering the viewport for the detection
 * @param    {Integer}    [delay=300]    The delay after the detection to trigger the animation
 *
 * @example       js
 * \@import 	slideIn from '@coffeekraken/text-intro/js/slideIn'
 * slideIn(); // init listeners
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function slideIn(offset = -window.innerHeight*.2, delay = 300) {
	__querySelectorLive('[intro^="slide-in-"]', (elm) => {
		__whenInViewport(elm, offset).then((elm) => {
			setTimeout(() => {
				elm.classList.add('active');
			}, delay);
		});
	});
}
