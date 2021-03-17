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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = resolveTokens;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L3Jlc29sdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDBEQUFzQztJQUN0Qyw4Q0FBMEI7SUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsYUFBYSxDQUFDLE1BQU07UUFDM0IsbUJBQW1CO1FBQ25CLElBQU0sYUFBYSxHQUFHLG1CQUFXLENBQy9CLE1BQU0sRUFDTixVQUFDLE1BQU07WUFDTCxvQkFBb0I7WUFDcEIsSUFBTSxRQUFRLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELHlCQUF5QjtZQUN6QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFDbEQsK0JBQStCO1lBQy9CLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO1lBQ3RDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRTFCLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU8sUUFBUSxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO2dCQUNuQixVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FDN0IsS0FBSyxFQUNMLGFBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUM3RCxDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUMsRUFDRDtZQUNFLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQ0YsQ0FBQztRQUNGLDRCQUE0QjtRQUM1QixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=