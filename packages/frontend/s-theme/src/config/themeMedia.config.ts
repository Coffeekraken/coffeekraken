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
