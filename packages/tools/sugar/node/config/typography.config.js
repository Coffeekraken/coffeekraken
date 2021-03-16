"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * @name            font-family
     * @namespace       config.typography
     * @type            String
     * @default         [config.fonts.defaultFontFamily]
     *
     * Set the font to use by default. Has to be a font that exists in the config ```fonts```
     *
     * @since           1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'font-family': '[config.fonts.defaultFontFamily]',
    /**
     * @name            font-size
     * @namespace       config.typography
     * @type            String
     * @default         [config.fonts.defaultFontSize]
     *
     * Set the font size to use by default
     *
     * @since           1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'font-size': '[config.fonts.defaultFontSize]',
    /**
     * @name            font-sizes
     * @namespace       config.typography
     * @type            Object
     * @default         null
     *
     * Object of font-sizes by media. The object format is { size: media }
     *
     * @example         js
     * {
     *   typography: {
     *     'font-sizes': {
     *       '20px': '(min-width: 500px) and (max-width: 1500px)'
     *     }
     *   }
     * }
     *
     * @since           1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'font-sizes': null,
    /**
     * @name            line-letters-count
     * @namespace       config.typography
     * @type            Number
     * @default         55
     *
     * Optimal letters count in a line
     *
     * @since           1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'line-letters-count': 55,
    /**
     * @name              text-format-class
     * @namespace         config.typography
     * @type              String
     * @default           tf
     *
     * Specify the scope class name to generate in order to apply the text formatting on some elements
     *
     * @since             1.0.0
     * @see               https://www.npmjs.com/package/modularscale-sass
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'text-format-class': 'text-format',
    /**
     * @name              vertical-rhythm-class
     * @namespace         config.typography
     * @type              String
     * @default           vr
     *
     * Specify the scope class name to generate in order to apply the vertical rhythm on some elements
     *
     * @since             1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'vertical-rhythm-class': 'vertical-rhythm'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL3R5cG9ncmFwaHkuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYjs7Ozs7Ozs7OztPQVVHO0lBQ0gsYUFBYSxFQUFFLGtDQUFrQztJQUVqRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsV0FBVyxFQUFFLGdDQUFnQztJQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksRUFBRSxJQUFJO0lBRWxCOzs7Ozs7Ozs7O09BVUc7SUFDSCxvQkFBb0IsRUFBRSxFQUFFO0lBRXhCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsdUJBQXVCLEVBQUUsaUJBQWlCO0NBQzNDLENBQUMifQ==