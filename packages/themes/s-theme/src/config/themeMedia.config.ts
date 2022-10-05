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
         * mixin call like ```@include Sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
         * the above media will be the same as ```@include Sugar.media('>=tablet') {...}```
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultAction: '<=',

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
             * @default       {'min-width': 0, 'max-width': 639}
             *
             * Specify the media query arguments needed to target mobile
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            mobile: {
                'min-width': 0,
                'max-width': 639,
            },

            /**
             * @name          tablet
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'min-width': 640, 'max-width': 1279}
             *
             * Specify the media query arguments needed to target tablet
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            tablet: {
                'min-width': 640,
                'max-width': 1279,
            },

            /**
             * @name          desktop
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'min-width': 1280, 'max-width': 2047}
             *
             * Specify the media query arguments needed to target desktop
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            desktop: {
                'min-width': 1280,
                'max-width': 2047,
            },

            /**
             * @name          wide
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'min-width': 2048, 'max-width': null}
             *
             * Specify the media query arguments needed to target wide
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            wide: {
                'min-width': 2048,
                'max-width': null,
            },

            /**
             * @name          dwarf
             * @namespace     config.themeMedia.queries
             * @type          Object
             * @default       {'min-width': 2048, 'max-width': null}
             *
             * Specify the media query arguments needed to target dwarf.
             * Dwarf here means small height screen.
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            dwarf: {
                'min-height': null,
                'max-height': 700,
            },
        },
    };
}
