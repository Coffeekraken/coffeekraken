var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/config/sugar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
    /**
     * @name            colorValue
     * @namespace       sugar.shared.dev.colors
     * @type            Function
     *
     * Return the list of color names you can access using the ```getColor``` function.
     * These colors are specified in the config.terminal configuration file under the "colors" property.
     *
     * @example         js
     * import colorValue from '@coffeekraken/sugar/shared/dev/colors/colorValue';
     * colorValue('black'); => #000000
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function colorValue(color) {
        if (!sugar_1.default('dev.colors')[color]) {
            throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(sugar_1.default('dev.colors')).join(',')}`);
        }
        return sugar_1.default('dev.colors')[color];
    }
    exports.default = colorValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbG9yVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxvRkFBb0U7SUFFcEU7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxTQUF3QixVQUFVLENBQUMsS0FBSztRQUN0QyxJQUFJLENBQUMsZUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQ2IscUVBQXFFLEtBQUssa0hBQWtILE1BQU0sQ0FBQyxJQUFJLENBQ3JNLGVBQWEsQ0FBQyxZQUFZLENBQUMsQ0FDNUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDZCxDQUFDO1NBQ0g7UUFDRCxPQUFPLGVBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBVEQsNkJBU0MifQ==