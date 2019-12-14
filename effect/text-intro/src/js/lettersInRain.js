import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
import __whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
import __querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'

/**
 * @name      lettersInRain
 * @namespace       text-intro
 * @type        Function
 *
 * Init the listener for the "letters-in-rain" intro to work
 *
 * @param    {Integer}    [offset=-window.innerHeight*.2]    An offset that represent the distance before entering the viewport for the detection
 * @param    {Integer}    [delay=300]    The delay after the detection to trigger the animation
 *
 * @example     js
 * \@import 	lettersInRain from '@coffeekraken/text-intro/js/lettersInRain';
 * lettersInRain(); // init listeners
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function lettersInRain(offset = -window.innerHeight*.2, delay = 300) {
	__querySelectorLive('[intro="letters-in-rain"]', (elm) => {
		__splitLetters(elm);
		__whenInViewport(elm, offset).then((elm) => {
			setTimeout(() => {
				elm.classList.add('active');
			}, delay);
		});
	});
}
