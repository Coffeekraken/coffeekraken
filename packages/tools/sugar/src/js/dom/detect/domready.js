// @ts-nocheck
/**
 * @name      domReady
 * @namespace            js.dom.detection
 * @type      Function
 * @stable
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @param 		{Function} 		cb 			An optional callback that will be called when the dom is ready
 * @return 		{Promise} 					A promise that will be resolved when the dom is ready
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import domReady from '@coffeekraken/sugar/js/dom/domReady'
 * // using callback
 * domReady(() => {
 * 		// do something
 * });
 * // using promise
 * domReady().then(() => {
 * 		// do something
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
import __domReady from 'domready';
function domReady(cb = null) {
    return new Promise((resolve, reject) => {
        __domReady(() => {
            cb && cb();
            resolve();
        });
    });
}
export default domReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tcmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21yZWFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsU0FBUyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUk7SUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ1gsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=