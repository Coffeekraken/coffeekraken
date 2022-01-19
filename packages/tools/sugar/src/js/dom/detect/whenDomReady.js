// @ts-nocheck
/**
 * @name      whenDomReady
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status      beta
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @param 		{Function} 		[cb=null] 			An optional callback that will be called when the dom is ready
 * @return 		{Promise} 					A promise that will be resolved when the dom is ready
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import whenDomReady from '@coffeekraken/sugar/js/dom/detect/whenDomReady'
 * // using callback
 * whenDomReady(() => {
 * 		// do something
 * });
 * // using promise
 * whenDomReady().then(() => {
 * 		// do something
 * });
 *
 * @see             https://www.jstips.co/en/javascript/detect-document-ready-in-pure-js/
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function whenDomReady(cb = null) {
    return new Promise((resolve, reject) => {
        if (document.readyState === 'complete') {
            cb === null || cb === void 0 ? void 0 : cb();
            resolve();
        }
        else {
            document.onreadystatechange = () => {
                if (document.readyState === 'complete') {
                    cb === null || cb === void 0 ? void 0 : cb();
                    resolve();
                }
            };
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkRvbVJlYWR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2hlbkRvbVJlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUFDLEVBQUUsR0FBRyxJQUFJO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNwQyxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLEVBQUksQ0FBQztZQUNQLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNILFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7b0JBQ3BDLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsRUFBSSxDQUFDO29CQUNQLE9BQU8sRUFBRSxDQUFDO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDO1NBQ0w7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==