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
export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxRQUFRO1lBQ3BCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsOERBQThEO1NBQ3pFO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxRQUFRO1lBQ3BCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsdUVBQXVFO1NBQ2xGO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxpQ0FBaUM7WUFDN0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxRQUFRO1lBQ3BCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsUUFBUTtZQUNuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLE1BQU07WUFDbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBRUQsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxpREFBaUQ7WUFDN0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxRQUFRO1lBQ3BCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsUUFBUTtZQUNuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLE1BQU07WUFDbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFNBQVMsRUFBRSxJQUFJO1NBQ2xCO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==