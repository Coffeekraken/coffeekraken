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
 *
 * @param       {Number}                    number      The level of details to wait on
 * @return 		{Promise} 								The promise that will be resolved
 *
 * @snippet         __whenLod($1);
 * __whenLod($1).then(() => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __whenLod } from '@coffeekraken/sugar/dom'
 * __whenLod(3).then(() => {
 * 		// do something when the lod is reached
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenLod(level) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQVdHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsS0FBYTtJQUN6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDM0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxrQkFBa0I7UUFDbEIsSUFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLEVBQUU7WUFDOUMsT0FBTyxPQUFPLEVBQUUsQ0FBQztTQUNwQjtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDN0QsS0FBSyxNQUFNLFFBQVEsSUFBSSxZQUFZLEVBQUU7Z0JBQ2pDLElBQ0ksUUFBUSxDQUFDLElBQUksS0FBSyxZQUFZO29CQUM5QixRQUFRLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFDcEM7b0JBQ0UsSUFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLEVBQUU7d0JBQzlDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsT0FBTyxPQUFPLEVBQUUsQ0FBQztxQkFDcEI7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzVCLGVBQWUsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUMxQixVQUFVLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==