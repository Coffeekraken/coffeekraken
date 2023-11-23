"use strict";
/**
 * @name                    themeFontFamily
 * @as                      Fonts
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme fontFamily available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        default: {
            /**
             * @name            fontFamily
             * @namespace       config.themeFontFamily.default
             * @type            String
             * @default         "Roboto"
             *
             * Declare the "default" fontFamily
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontFamily: 'Roboto',
            /**
             * @name            fontWeight
             * @namespace       config.themeFontFamily.default
             * @type            Number
             * @default         400
             *
             * Declare the "default" fontWeight
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontWeight: 400,
            /**
             * @name            import
             * @namespace       config.themeFontFamily.default
             * @type            String
             * @default         https://fonts.googleapis.com/css2?family=Roboto&display=swap
             *
             * Declare the "default" import
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            import: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        },
        title: {
            /**
             * @name            fontFamily
             * @namespace       config.themeFontFamily.title
             * @type            String
             * @default         Roboto
             *
             * Declare the "default" fontFamily
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontFamily: 'Roboto',
            /**
             * @name            fontWeight
             * @namespace       config.themeFontFamily.title
             * @type            String
             * @default         500
             *
             * Declare the "default" fontWeight
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontWeight: 500,
            /**
             * @name            import
             * @namespace       config.themeFontFamily.title
             * @type            String
             * @default         https://fonts.googleapis.com/css2?family=Roboto:wght@600&display=swap
             *
             * Declare the "default" import
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            import: 'https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap',
        },
        quote: {
            /**
             * @name            fontFamily
             * @namespace       config.themeFontFamily.quote
             * @type            String
             * @default         "Palatino, Times, Georgia, serif"
             *
             * Declare the "quote" fontFamily
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontFamily: 'Palatino, Times, Georgia, serif',
            /**
             * @name            fontWeight
             * @namespace       config.themeFontFamily.quote
             * @type            String
             * @default         normal
             *
             * Declare the "quote" fontWeight
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontWeight: 'normal',
            /**
             * @name            fontStyle
             * @namespace       config.themeFontFamily.quote
             * @type            String
             * @default         normal"
             *
             * Declare the "quote" fontStyle
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontStyle: 'normal',
            /**
             * @name            fontDisplay
             * @namespace       config.themeFontFamily.quote
             * @type            String
             * @default         auto
             *
             * Declare the "quote" fontDisplay
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontDisplay: 'auto',
            /**
             * @name            cap-height
             * @namespace       config.themeFontFamily.quote
             * @type            Number
             * @default         0.65
             *
             * Declare the "quote" cap-height
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            capHeight: 0.65,
        },
        code: {
            /**
             * @name            fontFamily
             * @namespace       config.themeFontFamily.code
             * @type            String
             * @default         "Menlo, Monaco, Consolas, Courier New, monospace"
             *
             * Declare the "code" fontFamily
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
            /**
             * @name            fontWeight
             * @namespace       config.themeFontFamily.code
             * @type            String
             * @default         normal
             *
             * Declare the "code" fontWeight
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontWeight: 'normal',
            /**
             * @name            fontStyle
             * @namespace       config.themeFontFamily.code
             * @type            String
             * @default         normal
             *
             * Declare the "code" fontStyle
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontStyle: 'normal',
            /**
             * @name            fontDisplay
             * @namespace       config.themeFontFamily.code
             * @type            String
             * @default         auto
             *
             * Declare the "code" fontDisplay
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fontDisplay: 'auto',
            /**
             * @name            cap-height
             * @namespace       config.themeFontFamily.code
             * @type            Number
             * @default         0.65
             *
             * Declare the "code" cap-height
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            capHeight: 0.65,
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNILE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsUUFBUTtZQUNwQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLDhEQUE4RDtTQUN6RTtRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsUUFBUTtZQUNwQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLHVFQUF1RTtTQUNsRjtRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsaUNBQWlDO1lBQzdDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsUUFBUTtZQUNwQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLFFBQVE7WUFDbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxNQUFNO1lBQ25COzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsSUFBSTtTQUNsQjtRQUVELElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsaURBQWlEO1lBQzdEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsUUFBUTtZQUNwQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLFFBQVE7WUFDbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxNQUFNO1lBQ25COzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsSUFBSTtTQUNsQjtLQUNKLENBQUM7QUFDTixDQUFDO0FBOU1ELDRCQThNQyJ9