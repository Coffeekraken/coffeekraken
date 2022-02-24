// @ts-nocheck
import __deepProxy from './deepProxy';
import __get from './get';
/**
 * @name                      resolveTokens
 * @namespace            js.object
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsTUFBTTtJQUN6QixtQkFBbUI7SUFDbkIsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUM3QixNQUFNLEVBQ04sQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNQLG9CQUFvQjtRQUNwQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQseUJBQXlCO1FBQ3pCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQ2xELCtCQUErQjtRQUMvQixNQUFNLEdBQUcsR0FBRyx5QkFBeUIsQ0FBQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FDM0IsS0FBSyxFQUNMLEtBQUssQ0FDRCxNQUFNLEVBQ04sS0FBSztpQkFDQSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztpQkFDaEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQzVCLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQyxFQUNEO1FBQ0ksU0FBUyxFQUFFLElBQUk7S0FDbEIsQ0FDSixDQUFDO0lBQ0YsNEJBQTRCO0lBQzVCLE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9