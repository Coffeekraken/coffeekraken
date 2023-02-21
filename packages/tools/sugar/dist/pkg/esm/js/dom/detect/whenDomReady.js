// @ts-nocheck
/**
 * @name      whenDomReady
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status      stable
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @return 		{Promise<void>} 					A promise that will be resolved when the dom is ready
 *
 * @todo      tests
 *
 * @example  	js
 * import { __whenDomReady } from '@coffeekraken/sugar/dom'
 * // using promise
 * __whenDomReady().then(() => {
 * 		// do something
 * });
 *
 * @see             https://www.jstips.co/en/javascript/detect-document-ready-in-pure-js/
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenDomReady() {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
        }
        else {
            document.onreadystatechange = () => {
                if (document.readyState === 'complete') {
                    resolve();
                }
            };
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjO0lBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ3BDLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNILFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDO1NBQ0w7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==