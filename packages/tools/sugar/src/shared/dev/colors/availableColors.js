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
     * @name            availableColors
     * @namespace       sugar.shared.dev.colors
     * @type            Function
     *
     * Return the list of color names you can access using the ```colorValue``` function.
     * These colors are specified in the config.terminal configuration file under the "colors" property.
     *
     * @example         js
     * import availableColors from '@coffeekraken/sugar/shared/dev/colors/availableColors';
     * availableColors(); => ['black','white','yellow','green',...]
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function availableColors() {
        return Object.keys(sugar_1.default('dev.colors'));
    }
    exports.default = availableColors;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0ZBQW9FO0lBRXBFOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsU0FBd0IsZUFBZTtRQUNyQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUZELGtDQUVDIn0=