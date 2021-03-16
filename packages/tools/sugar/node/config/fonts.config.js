"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * @name            defaultFontSize
     * @namespace       config.fonts
     * @type            String|Number
     * @default         16
     *
     * Specify which of the font-sizes values is the default one.
     * The default one mean that it's the base font-size applied to
     * all the website through the ```body``` element
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    defaultFontSize: 16,
    /**
     * @name            defaultFontFamily
     * @namespace       config.fonts
     * @type            String
     * @default         default
     *
     * Specify which of the font families has to be used as the default one
     * to be applied on all the website through the ```body``` element
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    defaultFontFamily: 'default',
    /**
     * @name            families
     * @namespace       config.fonts
     * @type            Object
     *
     * Store the font families that will be available in the project
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    families: {
        /**
         * @name            default
         * @namespace       config.fonts.families
         * @type            Object
         *
         * Declare the <primary>default</primary> font face
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: {
            'font-family': 'Titillium Web',
            'font-weight': 400,
            import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
        },
        /**
         * @name            title
         * @namespace       config.fonts.families
         * @type            Object
         *
         * Declare the <primary>title</primary> font face
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        title: {
            'font-family': 'Titillium Web',
            'font-weight': 700,
            import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap'
        },
        /**
         * @name            quote
         * @namespace       config.fonts.families
         * @type            Object
         *
         * Declare the <primary>quote</primary> font face
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        quote: {
            'font-family': 'Palatino, Times, Georgia, serif',
            'font-weight': 'normal',
            'font-style': 'normal',
            'font-display': 'auto',
            'cap-height': 0.65
        },
        /**
         * @name            code
         * @namespace       config.fonts.families
         * @type            Object
         *
         * Declare the <primary>code</primary> font face
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        code: {
            'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
            'font-weight': 'normal',
            'font-style': 'normal',
            'font-display': 'auto',
            'cap-height': 0.65
        }
    },
    /**
     * @name            sizes
     * @namespace       config.fonts
     * @type            Object
     *
     * Store the font sizes that will be available in the project
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sizes: {
        /**
         * @name          0
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       0px
         *
         * Declare the font size <primary>0</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '0px',
        /**
         * @name          10
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       4px
         *
         * Declare the font size <primary>10</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '4px',
        /**
         * @name          20
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       8px
         *
         * Declare the font size <primary>20</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '8px',
        /**
         * @name          30
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       12px
         *
         * Declare the font size <primary>30</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '12px',
        /**
         * @name          40
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       16px
         *
         * Declare the font size <primary>40</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '16px',
        /**
         * @name          50
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       24px
         *
         * Declare the font size <primary>50</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '24px',
        /**
         * @name          60
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       32px
         *
         * Declare the font size <primary>60</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '32px',
        /**
         * @name          70
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       40px
         *
         * Declare the font size <primary>70</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '40px',
        /**
         * @name          80
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       48px
         *
         * Declare the font size <primary>80</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '48px',
        /**
         * @name          90
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       56px
         *
         * Declare the font size <primary>90</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '56px',
        /**
         * @name          100
         * @namespace     config.fonts.sizes
         * @type          String
         * @default       64px
         *
         * Declare the font size <primary>100</primary>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        100: '64px'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udHMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9mb250cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGVBQWUsRUFBRSxFQUFFO0lBRW5COzs7Ozs7Ozs7OztPQVdHO0lBQ0gsaUJBQWlCLEVBQUUsU0FBUztJQUU1Qjs7Ozs7Ozs7O09BU0c7SUFDSCxRQUFRLEVBQUU7UUFDUjs7Ozs7Ozs7O1dBU0c7UUFDSCxPQUFPLEVBQUU7WUFDUCxhQUFhLEVBQUUsZUFBZTtZQUM5QixhQUFhLEVBQUUsR0FBRztZQUNsQixNQUFNLEVBQ0osOEVBQThFO1NBQ2pGO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsYUFBYSxFQUFFLGVBQWU7WUFDOUIsYUFBYSxFQUFFLEdBQUc7WUFDbEIsTUFBTSxFQUNKLDhFQUE4RTtTQUNqRjtRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRTtZQUNMLGFBQWEsRUFBRSxpQ0FBaUM7WUFDaEQsYUFBYSxFQUFFLFFBQVE7WUFDdkIsWUFBWSxFQUFFLFFBQVE7WUFDdEIsY0FBYyxFQUFFLE1BQU07WUFDdEIsWUFBWSxFQUFFLElBQUk7U0FDbkI7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLEVBQUU7WUFDSixhQUFhLEVBQUUsaURBQWlEO1lBQ2hFLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLFlBQVksRUFBRSxRQUFRO1lBQ3RCLGNBQWMsRUFBRSxNQUFNO1lBQ3RCLFlBQVksRUFBRSxJQUFJO1NBQ25CO0tBQ0Y7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsQ0FBQyxFQUFFLEtBQUs7UUFFUjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLEtBQUs7UUFFVDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLEtBQUs7UUFFVDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsR0FBRyxFQUFFLE1BQU07S0FDWjtDQUNGLENBQUMifQ==