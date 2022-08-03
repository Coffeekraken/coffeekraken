// @ts-nocheck
/**
 * @name      whenRemoved
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
 *
 * Resolve a promise when the passed node has been removed from the dom
 *
 * @feature       Detect when the element has been removed from the dom
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 				The HTMLElement on which to monitor
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenRemoved from '@coffeekraken/sugar/js/dom/whenRemoved'
 * whenRemoved(myCoolHTMLElement).then((value) => {
 * 		// the element has been removed
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenRemoved($elm) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.removedNodes.forEach(function (removedNode) {
                    if (removedNode === $elm) {
                        resolve($elm);
                        observer.disconnect();
                    }
                });
            });
        });
        observer.observe($elm.parentElement, {
            subtree: false,
            childList: true,
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxJQUFJO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLFNBQVM7WUFDckQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLFFBQVE7Z0JBQ2hDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVztvQkFDL0MsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO3dCQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2QsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3FCQUN6QjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDakMsT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==