"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            whenLod
 * @type            Function
 *
 * This method allows you to have a promise back that will be resolved when the actuel theme lod meet the requested one
 *
 * @param           {Number}                level           The level you want to wait on
 * @return          {Promise}                                    A promise that will be resolved once the correct level has been reached
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
/**
 * @name      whenLod
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Wait until the requested lod (level of details) has been reached.
 * See @coffeekraken/s-theme package for more infos
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param       {Number}                    number      The level of details to wait on
 * @return 		{Promise} 								The promise that will be resolved
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __whenLod } from '@coffeekraken/sugar/dom'
 * __whenLod(3).then((link) => {
 * 		// do something when the lod is reached
 * });
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenLod(level) {
    return new Promise((resolve) => {
        const $html = document.querySelector('html');
        // already reachec
        if ($html === null || $html === void 0 ? void 0 : $html.classList.contains(`s-lod--${level}`)) {
            return resolve();
        }
        const observer = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'class') {
                    if ($html === null || $html === void 0 ? void 0 : $html.classList.contains(`s-lod--${level}`)) {
                        observer.disconnect();
                        return resolve();
                    }
                }
            }
        });
        observer.observe(document.body, {
            attributeFilter: ['class'],
            attributes: true,
        });
    });
}
exports.default = whenLod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7O0dBV0c7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxLQUFhO0lBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLGtCQUFrQjtRQUNsQixJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM5QyxPQUFPLE9BQU8sRUFBRSxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUM3RCxLQUFLLE1BQU0sUUFBUSxJQUFJLFlBQVksRUFBRTtnQkFDakMsSUFDSSxRQUFRLENBQUMsSUFBSSxLQUFLLFlBQVk7b0JBQzlCLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUNwQztvQkFDRSxJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsRUFBRTt3QkFDOUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixPQUFPLE9BQU8sRUFBRSxDQUFDO3FCQUNwQjtpQkFDSjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsZUFBZSxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQzFCLFVBQVUsRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTVCRCwwQkE0QkMifQ==