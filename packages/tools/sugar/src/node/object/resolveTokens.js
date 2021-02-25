// @ts-nocheck
// @shared
import __deepProxy from './deepProxy';
import __get from './get';
/**
 * @name                      resolveTokens
 * @namespace           sugar.js.object
 * @type                      Function
 * @status              wip
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            finalValue = finalValue.replace(token, __get(object, token.replace('{', '').replace('}', '').replace('this.', '')));
        });
        return finalValue;
    }, {
        handleGet: true
    });
    // return the proxied object
    return proxiedObject;
}
export default resolveTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxNQUFNO0lBQzNCLG1CQUFtQjtJQUNuQixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQy9CLE1BQU0sRUFDTixDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1Qsb0JBQW9CO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCx5QkFBeUI7UUFDekIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDbEQsK0JBQStCO1FBQy9CLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUM3QixLQUFLLEVBQ0wsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQzdELENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxFQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FDRixDQUFDO0lBQ0YsNEJBQTRCO0lBQzVCLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9