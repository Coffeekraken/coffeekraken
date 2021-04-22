var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./sugar", "@coffeekraken/sugar/shared/object/get"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sugar_1 = __importDefault(require("./sugar"));
    const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
    /**
     * @name            themeConfig
     * @namespace       shared
     * @type            Function
     *
     * This function simply get a theme value depending on the dot path passed and the
     * theme wanted.
     * If the wanted theme is not ```default```, it will try to get the value from
     * this passed theme and fallback to the default theme value if not exists.
     *
     * @param       {String}        dotPath         The dot path to the value wanted
     * @param       {String}        [theme='default']       The theme from which to get the value
     * @return      {Any}                           The value getted from the theme
     *
     * @example         js
     * import { themeConfig } from '@coffeekraken/s-sugar-config';
     * themeConfig('paddings.100', 'something'); // => 1rem
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function themeConfig(dotPath, theme = 'default') {
        // get theme
        const themeObj = sugar_1.default('theme');
        if (!themeObj[theme])
            theme = 'default';
        const res = get_1.default(themeObj[theme], dotPath);
        if (res !== undefined)
            return res;
        if (theme !== 'default')
            return themeConfig(dotPath, 'default');
        throw new Error(`<red>[themeConfig]</red> Sorry but the requested value "<yellow>${dotPath}</yellow>" for the theme "<cyan>${theme}</cyan>" does not exists...`);
    }
    exports.default = themeConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9EQUFvQztJQUNwQyxnRkFBMEQ7SUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsU0FBd0IsV0FBVyxDQUFDLE9BQWUsRUFBRSxLQUFLLEdBQUcsU0FBUztRQUNwRSxZQUFZO1FBQ1osTUFBTSxRQUFRLEdBQUcsZUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN4QyxNQUFNLEdBQUcsR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksR0FBRyxLQUFLLFNBQVM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQ2IsbUVBQW1FLE9BQU8sbUNBQW1DLEtBQUssNkJBQTZCLENBQ2hKLENBQUM7SUFDSixDQUFDO0lBVkQsOEJBVUMifQ==