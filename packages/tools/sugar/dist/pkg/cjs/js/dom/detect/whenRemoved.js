"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      whenRemoved
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Resolve a promise when the passed node has been removed from the dom
 *
 * @feature       Detect when the element has been removed from the dom
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 				The HTMLElement on which to monitor
 * @return 		(Promise<HTMLElement>) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @todo      tests
 *
 * @example 	js
 * import __whenRemoved from '@coffeekraken/sugar/js/dom/whenRemoved'
 * __whenRemoved(myCoolHTMLElement).then((value) => {
 * 		// the element has been removed
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenRemoved($elm) {
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
exports.default = whenRemoved;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUF3QixXQUFXLENBQUMsSUFBSTtJQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsVUFBVSxTQUFTO1lBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRO2dCQUNoQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVc7b0JBQy9DLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTt3QkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNkLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQkFDekI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBakJELDhCQWlCQyJ9