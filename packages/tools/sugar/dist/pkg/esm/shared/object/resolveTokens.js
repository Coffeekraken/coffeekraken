// @ts-nocheck
import __deepProxy from './deepProxy';
import __get from './get';
/**
 * @name                      resolveTokens
 * @namespace            shared.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take an object and propare it to accept tokens like:
 * - '{this.something.else}'
 * - etc...
 *
 * @param         {Object}            object        The object to process
 * @return        {Object}                          The proxied object that you can use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      add some settings to set token structure
 *
 * @example       js
 * import resolveTokens from '@coffeekraken/sugar/js/object/resolveTokens';
 * const myObj = resolveTokens({
 *    hello: 'world',
 *    plop: '{this.hello}
 * });
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function resolveTokens(object) {
    // proxy the object
    const proxiedObject = __deepProxy(object, (getObj) => {
        // get the raw value
        const rawValue = __get(getObj.target, getObj.key);
        // check if it's a string
        if (typeof rawValue !== 'string')
            return rawValue;
        // check if we have some tokens
        const reg = /\{([a-zA-Z0-9\.-_]+)\}/g;
        const tokens = rawValue.match(reg);
        let finalValue = rawValue;
        if (!tokens)
            return rawValue;
        tokens.forEach((token) => {
            finalValue = finalValue.replace(token, __get(object, token
                .replace('{', '')
                .replace('}', '')
                .replace('this.', '')));
        });
        return finalValue;
    }, {
        handleGet: true,
    });
    // return the proxied object
    return proxiedObject;
}
export default resolveTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsYUFBYSxDQUFDLE1BQU07SUFDekIsbUJBQW1CO0lBQ25CLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FDN0IsTUFBTSxFQUNOLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDUCxvQkFBb0I7UUFDcEIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELHlCQUF5QjtRQUN6QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUNsRCwrQkFBK0I7UUFDL0IsTUFBTSxHQUFHLEdBQUcseUJBQXlCLENBQUM7UUFDdEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQzNCLEtBQUssRUFDTCxLQUFLLENBQ0QsTUFBTSxFQUNOLEtBQUs7aUJBQ0EsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUNoQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUM1QixDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUMsRUFDRDtRQUNJLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQ0osQ0FBQztJQUNGLDRCQUE0QjtJQUM1QixPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==