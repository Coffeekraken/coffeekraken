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
     * themeConfig('paddings.100'); // => 1rem
     * themeConfig('dark:paddings.100'); // => 1.5rem
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function themeConfig(dotPath) {
        // get theme
        const themeObj = sugar_1.default('theme');
        let theme = dotPath.includes(':')
            ? dotPath.split(':')[0]
            : themeObj.baseTheme;
        if (!themeObj.themes[theme])
            theme = 'default';
        const res = get_1.default(themeObj.themes[theme], dotPath);
        if (res !== undefined)
            return res;
        if (theme !== 'default')
            return themeConfig('default:' + dotPath);
        throw new Error(`<red>[themeConfig]</red> Sorry but the requested value "<yellow>${dotPath}</yellow>" for the theme "<cyan>${theme}</cyan>" does not exists...`);
    }
    exports.default = themeConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9EQUFvQztJQUNwQyxnRkFBMEQ7SUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQXdCLFdBQVcsQ0FBQyxPQUFlO1FBQ2pELFlBQVk7UUFDWixNQUFNLFFBQVEsR0FBRyxlQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDL0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUFFLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDL0MsTUFBTSxHQUFHLEdBQUcsYUFBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxHQUFHLEtBQUssU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVM7WUFBRSxPQUFPLFdBQVcsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FDYixtRUFBbUUsT0FBTyxtQ0FBbUMsS0FBSyw2QkFBNkIsQ0FDaEosQ0FBQztJQUNKLENBQUM7SUFiRCw4QkFhQyJ9