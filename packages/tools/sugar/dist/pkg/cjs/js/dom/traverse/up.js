"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        up
 * @namespace            js.dom.traverse
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three until the callback function return true
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{Function} 				        callback 	The callback function to call on each element. If this returns on an element, it will be the returned element
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import up from '@coffeekraken/sugar/js/dom/traverse/up'
 * const $elm = up($myElement, elm => {
 *      return elm.classList.contains('my-class')
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function up($elm, callback) {
    const originalElm = $elm;
    $elm = $elm.parentNode;
    while ($elm && $elm != originalElm.ownerDocument) {
        if (callback($elm))
            return $elm;
        $elm = $elm.parentNode;
    }
    return null;
}
exports.default = up;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsRUFBRSxDQUFDLElBQWlCLEVBQUUsUUFBa0I7SUFDNUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzlDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQVJELHFCQVFDIn0=