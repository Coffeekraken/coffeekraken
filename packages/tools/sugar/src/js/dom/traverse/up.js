// @ts-nocheck
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
export default function up($elm, callback) {
    const originalElm = $elm;
    $elm = $elm.parentNode;
    while ($elm && $elm != originalElm.ownerDocument) {
        if (callback($elm))
            return $elm;
        $elm = $elm.parentNode;
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLEVBQUUsQ0FBQyxJQUFpQixFQUFFLFFBQWtCO0lBQzVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQztJQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN2QixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUM5QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUMxQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==