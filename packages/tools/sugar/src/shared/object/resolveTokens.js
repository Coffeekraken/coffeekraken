// @ts-nocheck
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepProxy_1 = __importDefault(require("./deepProxy"));
    const get_1 = __importDefault(require("./get"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBQ3RDLGdEQUEwQjtJQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsTUFBTTtRQUMzQixtQkFBbUI7UUFDbkIsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FDL0IsTUFBTSxFQUNOLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDVCxvQkFBb0I7WUFDcEIsTUFBTSxRQUFRLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELHlCQUF5QjtZQUN6QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFDbEQsK0JBQStCO1lBQy9CLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO1lBQ3RDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRTFCLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU8sUUFBUSxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQzdCLEtBQUssRUFDTCxhQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FDN0QsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDLEVBQ0Q7WUFDRSxTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUNGLENBQUM7UUFDRiw0QkFBNEI7UUFDNUIsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9