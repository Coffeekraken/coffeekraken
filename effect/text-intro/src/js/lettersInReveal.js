import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
import __whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
import __querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'

/**
 * @name      lettersInReveal
 * @namespace       text-intro
 * @type        function
 *
 * Init the listener for the "letters-in-reveal" intro to work
 *
 * @param    {Integer}    [offset=-window.innerHeight*.2]    An offset that represent the distance before entering the viewport for the detection
 * @param    {Integer}    [delay=300]    The delay after the detection to trigger the animation
 *
 * @example       js
 * \@import 	lettersInReveal from '@coffeekraken/text-intro/js/animLettersInReveal';
 * lettersInReveal(); // init listeners
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function lettersInReveal(offset = -window.innerHeight*.2, delay = 300) {
	__querySelectorLive('[intro="letters-in-reveal"]', (elm) => {
		__splitLetters(elm);
		__whenInViewport(elm, offset).then((elm) => {
			setTimeout(() => {
				elm.classList.add('active');
			}, delay);
		});
	});
}
