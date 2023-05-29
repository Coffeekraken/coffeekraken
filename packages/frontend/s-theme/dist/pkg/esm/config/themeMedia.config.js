/**
 * @name                    themeMedia
 * @as                      Medias
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme medias available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
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
        // /**
        //  * @name              method
        //  * @namespace         config.themeMedia
        //  * @type              String
        //  * @default           container
        //  *
        //  * Specify the method to use for media queries. By default it will use the @container query solution
        //  * that will refer to the "viewport" container-name.
        //  * The easiest way to start is to use the ".s-viewport" class that is generated through the `@sugar.init` mixin
        //  * and to wrap your whole body content into it.
        //  * This way you will be able to resize this container and keep the queries to work without resizing the window.
        //  * You can also set this to "media" if you prefer the plain old media queries.
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // method: 'container',
        // /**
        //  * @name              containerName
        //  * @namespace         config.themeMedia
        //  * @type              String
        //  * @default           viewport
        //  *
        //  * Specify the `container-name` used for the @container queries to refer to.
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // containerName: 'viewport',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUVuQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksWUFBWTtZQUNaLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsTUFBTTtRQUNOLCtCQUErQjtRQUMvQiwwQ0FBMEM7UUFDMUMsK0JBQStCO1FBQy9CLGtDQUFrQztRQUNsQyxLQUFLO1FBQ0wsdUdBQXVHO1FBQ3ZHLHVEQUF1RDtRQUN2RCxrSEFBa0g7UUFDbEgsa0RBQWtEO1FBQ2xELGtIQUFrSDtRQUNsSCxpRkFBaUY7UUFDakYsS0FBSztRQUNMLHdCQUF3QjtRQUN4QixrR0FBa0c7UUFDbEcsTUFBTTtRQUNOLHVCQUF1QjtRQUV2QixNQUFNO1FBQ04sc0NBQXNDO1FBQ3RDLDBDQUEwQztRQUMxQywrQkFBK0I7UUFDL0IsaUNBQWlDO1FBQ2pDLEtBQUs7UUFDTCwrRUFBK0U7UUFDL0UsS0FBSztRQUNMLHdCQUF3QjtRQUN4QixrR0FBa0c7UUFDbEcsTUFBTTtRQUNOLDZCQUE2QjtRQUU3QixPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxDQUFDO2dCQUNYLFFBQVEsRUFBRSxHQUFHO2FBQ2hCO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRTtnQkFDSixRQUFRLEVBQUUsR0FBRztnQkFDYixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9