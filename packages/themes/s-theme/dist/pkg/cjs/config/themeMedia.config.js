"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        /**
         * @name              defaultAction
         * @namespace         config.themeMedia
         * @type              String
         * @values            >,<,=,>=,<=
         * @default           <=
         *
         * Specify the default action to apply if you don't specify one in your media
         * mixin call like ```@sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
         * the above media will be the same as ```@sugar.media('>=tablet') {...}```
         * Note that by default it is set to "<=" which mean "desktop first"
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultAction: '<=',
        /**
         * @name              defaultMedia
         * @namespace         config.themeMedia
         * @type              String
         * @default           api.this.defaultAction === '<=' ? 'desktop' : 'mobile'
         *
         * Specify the default media that will not generate any media queries at all like in mobile first, it will
         * be the mobile media and in desktop first it will be the desktop media
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get defaultMedia() {
            return api.this.defaultAction === '>=' ? 'mobile' : 'desktop';
        },
        /**
         * @name              defaultQuery
         * @namespace         config.themeMedia
         * @type              String
         * @default           screen
         *
         * Specify the default query to base all the generated ones upon
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultQuery: 'screen',
        queries: {
            /**
             * @name          mobile
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'minWidth': 0, 'maxWidth': 639}
             *
             * Specify the media query arguments needed to target mobile
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            mobile: {
                minWidth: 0,
                maxWidth: 639,
            },
            /**
             * @name          tablet
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'minWidth': 640, 'maxWidth': 1279}
             *
             * Specify the media query arguments needed to target tablet
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            tablet: {
                minWidth: 640,
                maxWidth: 1279,
            },
            /**
             * @name          desktop
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'minWidth': 1280, 'maxWidth': 2047}
             *
             * Specify the media query arguments needed to target desktop
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            desktop: {
                minWidth: 1280,
                maxWidth: 2047,
            },
            /**
             * @name          wide
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'minWidth': 2048, 'maxWidth': null}
             *
             * Specify the media query arguments needed to target wide
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            wide: {
                minWidth: 2048,
                maxWidth: null,
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsYUFBYSxFQUFFLElBQUk7UUFFbkI7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLFlBQVk7WUFDWixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbEUsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsUUFBUTtRQUV0QixPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxDQUFDO2dCQUNYLFFBQVEsRUFBRSxHQUFHO2FBQ2hCO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRTtnQkFDSixRQUFRLEVBQUUsR0FBRztnQkFDYixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWxIRCw0QkFrSEMifQ==