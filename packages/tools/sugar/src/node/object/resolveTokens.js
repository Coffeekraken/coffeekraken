"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepProxy_1 = require("./deepProxy");
const get_1 = require("./get");
/**
 * @name                      resolveTokens
 * @namespace           sugar.js.object
 * @type                      Function
 *
 * This function take an object and propare it to accept tokens like:
 * - '{this.something.else}'
 * - etc...
 *
 * @param         {Object}            object        The object to process
 * @return        {Object}                          The proxied object that you can use
 *
 * @example       js
 * import resolveTokens from '@coffeekraken/sugar/js/object/resolveTokens';
 * const myObj = resolveTokens({
 *    hello: 'world',
 *    plop: '{this.hello}
 * });
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveTokens(object) {
    // proxy the object
    const proxiedObject = deepProxy_1.default(object, (getObj) => {
        // get the raw value
        const rawValue = get_1.default(getObj.target, getObj.key);
        // check if it's a string
        if (typeof rawValue !== 'string')
            return rawValue;
        // check if we have some tokens
        const reg = /\{([a-zA-Z0-9\.-_]+)\}/g;
        const tokens = rawValue.match(reg);
        let finalValue = rawValue;
        if (!tokens)
            return rawValue;
        // console.log(tokens);
        tokens.forEach((token) => {
            finalValue = finalValue.replace(token, get_1.default(object, token.replace('{', '').replace('}', '').replace('this.', '')));
        });
        return finalValue;
    }, {
        handleGet: true
    });
    // return the proxied object
    return proxiedObject;
}
exports.default = resolveTokens;
