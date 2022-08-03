"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepProxy_1 = __importDefault(require("./deepProxy"));
const get_1 = __importDefault(require("./get"));
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
    const proxiedObject = (0, deepProxy_1.default)(object, (getObj) => {
        // get the raw value
        const rawValue = (0, get_1.default)(getObj.target, getObj.key);
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
            finalValue = finalValue.replace(token, (0, get_1.default)(object, token
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
exports.default = resolveTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QyxnREFBMEI7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsTUFBTTtJQUN6QixtQkFBbUI7SUFDbkIsTUFBTSxhQUFhLEdBQUcsSUFBQSxtQkFBVyxFQUM3QixNQUFNLEVBQ04sQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNQLG9CQUFvQjtRQUNwQixNQUFNLFFBQVEsR0FBRyxJQUFBLGFBQUssRUFBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCx5QkFBeUI7UUFDekIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDbEQsK0JBQStCO1FBQy9CLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JCLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUMzQixLQUFLLEVBQ0wsSUFBQSxhQUFLLEVBQ0QsTUFBTSxFQUNOLEtBQUs7aUJBQ0EsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUNoQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUM1QixDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUMsRUFDRDtRQUNJLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQ0osQ0FBQztJQUNGLDRCQUE0QjtJQUM1QixPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=