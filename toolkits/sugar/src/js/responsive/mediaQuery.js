import __SPromise from '../promise/SPromise';

/**
 * @name					mediaQuery
 * @type 					Function
 * @async
 *
 * This function add a listener and return you an SPromise instance on which you can subscribe for
 * events like "match" or "unmatch".
 *
 * @param           {String}            mediaName           The media query name you want to listen to. Can be any queries defined in the config.media.queries stack
 * @return          {SPromise}                              An SPromise instance on which you can subscribe for events like "match" or "unmatch"
 *
 * @example         js
 * import mediaQuery from '@coffeekraken/sugar/js/responsive/mediaQuery';
 * mediaQuery('mobile').on('match', () => {
 *      // do something
 * });
 *
 * @since 					2.0.0
 * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const __mediaQueryPromisesStack = {};
let __activeMedia;

export default function mediaQuery(mediaName = '*') {}
