// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./deepProxy", "./get"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepProxy_1 = __importDefault(require("./deepProxy"));
    var get_1 = __importDefault(require("./get"));
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
        var proxiedObject = deepProxy_1.default(object, function (getObj) {
            // get the raw value
            var rawValue = get_1.default(getObj.target, getObj.key);
            // check if it's a string
            if (typeof rawValue !== 'string')
                return rawValue;
            // check if we have some tokens
            var reg = /\{([a-zA-Z0-9\.-_]+)\}/g;
            var tokens = rawValue.match(reg);
            var finalValue = rawValue;
            if (!tokens)
                return rawValue;
            tokens.forEach(function (token) {
                finalValue = finalValue.replace(token, get_1.default(object, token.replace('{', '').replace('}', '').replace('this.', '')));
            });
            return finalValue;
        }, {
            handleGet: true
        });
        // return the proxied object
        return proxiedObject;
    }
    return resolveTokens;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMERBQXNDO0lBQ3RDLDhDQUEwQjtJQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsTUFBTTtRQUMzQixtQkFBbUI7UUFDbkIsSUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FDL0IsTUFBTSxFQUNOLFVBQUMsTUFBTTtZQUNMLG9CQUFvQjtZQUNwQixJQUFNLFFBQVEsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQseUJBQXlCO1lBQ3pCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUTtnQkFBRSxPQUFPLFFBQVEsQ0FBQztZQUNsRCwrQkFBK0I7WUFDL0IsSUFBTSxHQUFHLEdBQUcseUJBQXlCLENBQUM7WUFDdEMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFMUIsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7Z0JBQ25CLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUM3QixLQUFLLEVBQ0wsYUFBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQzdELENBQ0YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxFQUNEO1lBQ0UsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FDRixDQUFDO1FBQ0YsNEJBQTRCO1FBQzVCLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxPQUFTLGFBQWEsQ0FBQyJ9