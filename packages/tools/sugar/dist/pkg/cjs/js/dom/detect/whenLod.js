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
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenLod(level) {
    return new Promise((resolve) => {
        // already reachec
        if (document.body.classList.contains(`s-lod--${level}`)) {
            return resolve();
        }
        const observer = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'class') {
                    if (document.body.classList.contains(`s-lod--${level}`)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7O0dBV0c7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxLQUFhO0lBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixrQkFBa0I7UUFDbEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELE9BQU8sT0FBTyxFQUFFLENBQUM7U0FDcEI7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzdELEtBQUssTUFBTSxRQUFRLElBQUksWUFBWSxFQUFFO2dCQUNqQyxJQUNJLFFBQVEsQ0FBQyxJQUFJLEtBQUssWUFBWTtvQkFDOUIsUUFBUSxDQUFDLGFBQWEsS0FBSyxPQUFPLEVBQ3BDO29CQUNFLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsRUFBRTt3QkFDckQsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixPQUFPLE9BQU8sRUFBRSxDQUFDO3FCQUNwQjtpQkFDSjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsZUFBZSxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQzFCLFVBQVUsRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTFCRCwwQkEwQkMifQ==