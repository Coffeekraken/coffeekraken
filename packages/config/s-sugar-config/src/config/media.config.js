export default {
    /**
     * @name              defaultAction
     * @namespace         config.media
     * @type              String
     * @values            >,<,=,>=,<=
     * @default           =
     *
     * Specify the default action to apply if you don't specify one in your media
     * mixin call like ```@include Sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
     * the above media will be the same as ```@include Sugar.media('>=tablet') {...}```
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    defaultAction: '=',
    /**
     * @name              defaultQuery
     * @namespace         config.media
     * @type              String
     * @default           screen
     *
     * Specify the default query to base all the generated ones upon
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    defaultQuery: 'screen',
    queries: {
        /**
         * @name          mobile
         * @namespace     config.media.queries
         * @type          Object
         * @default       {'min-width': null, 'max-width': 639}
         *
         * Specify the media query arguments needed to target mobile
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        mobile: {
            'min-width': null,
            'max-width': 639
        },
        // /**
        //  * @name          mobile-portrait
        //  * @namespace     config.media.queries
        //  * @type          Object
        //  * @default       {'min-width': null, 'max-width': 480}
        //  *
        //  * Specify the media query arguments needed to target mobile-portrait
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // 'mobile-portrait': {
        //   'min-width': null,
        //   'max-width': 480,
        //   orientation: 'portrait'
        // },
        // /**
        //  * @name          mobile-landscape
        //  * @namespace     config.media.queries
        //  * @type          Object
        //  * @default       {'min-width': null, 'max-width': 639}
        //  *
        //  * Specify the media query arguments needed to target mobile-landscape
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // 'mobile-landscape': {
        //   'min-width': null,
        //   'max-width': 639,
        //   oprientation: 'landscape'
        // },
        /**
         * @name          tablet
         * @namespace     config.media.queries
         * @type          Object
         * @default       {'min-width': 640, 'max-width': 1279}
         *
         * Specify the media query arguments needed to target tablet
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        tablet: {
            'min-width': 640,
            'max-width': 1279
        },
        // /**
        //  * @name          tablet-portrait
        //  * @namespace     config.media.queries
        //  * @type          Object
        //  * @default       {'min-width': 640, 'max-width': 1023}
        //  *
        //  * Specify the media query arguments needed to target tablet-portrait
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // 'tablet-portrait': {
        //   'min-width': 640,
        //   'max-width': 1023,
        //   orientation: 'portrait'
        // },
        // /**
        //  * @name          tablet-landscape
        //  * @namespace     config.media.queries
        //  * @type          Object
        //  * @default       {'min-width': 1024, 'max-width': 1279}
        //  *
        //  * Specify the media query arguments needed to target tablet-landscape
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // 'tablet-landscape': {
        //   'min-width': 1024,
        //   'max-width': 1279,
        //   oprientation: 'landscape'
        // },
        /**
         * @name          desktop
         * @namespace     config.media.queries
         * @type          Object
         * @default       {'min-width': 1280, 'max-width': null}
         *
         * Specify the media query arguments needed to target desktop
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        desktop: {
            'min-width': 1280,
            'max-width': null
        }
        // devices based media queries
        // 'iphone-4': require('./media/iphone-4-4s'),
        // 'iphone-4s': require('./media/iphone-4-4s'),
        // 'iphone-5': require('./media/iphone-5-5s-5c-5se'),
        // 'iphone-5s': require('./media/iphone-5-5s-5c-5se'),
        // 'iphone-5c': require('./media/iphone-5-5s-5c-5se'),
        // 'iphone-5se': require('./media/iphone-5-5s-5c-5se'),
        // 'iphone-6': require('./media/iphone-6-6s-7-8'),
        // 'iphone-6s': require('./media/iphone-6-6s-7-8'),
        // 'iphone-7': require('./media/iphone-6-6s-7-8'),
        // 'iphone-8': require('./media/iphone-6-6s-7-8'),
        // 'iphone-6+': require('./media/iphone-6+-7+-8+'),
        // 'iphone-7+': require('./media/iphone-6+-7+-8+'),
        // 'iphone-8+': require('./media/iphone-6+-7+-8+'),
        // 'iphone-x': require('./media/iphone-x'),
        // 'galaxy-s3': require('./media/galaxy-s3'),
        // 'galaxy-s4': require('./media/galaxy-s4-s5-note3'),
        // 'galaxy-s5': require('./media/galaxy-s4-s5-note3'),
        // 'galaxy-note3': require('./media/galaxy-s4-s5-note3'),
        // 'galaxy-s6': require('./media/galaxy-s6'),
        // pixel: require('./media/pixel'),
        // 'pixel-xl': require('./media/pixel-xl'),
        // 'htc-one': require('./media/htc-one'),
        // windows: require('./media/windows'),
        // 'ipad-1': require('./media/ipad-1-2-mini-air'),
        // 'ipad-2': require('./media/ipad-1-2-mini-air'),
        // 'ipad-mini': require('./media/ipad-1-2-mini-air'),
        // 'ipad-air': require('./media/ipad-1-2-mini-air'),
        // 'ipad-3': require('./media/ipad-3-4-pro9'),
        // 'ipad-4': require('./media/ipad-3-4-pro9'),
        // 'ipad-pro9': require('./media/ipad-3-4-pro9'),
        // 'ipad-pro10': require('./media/ipad-pro10'),
        // 'ipad-pro12': require('./media/ipad-pro12'),
        // 'galaxy-tab2': require('./media/galaxy-tab2'),
        // 'galaxy-tabs': require('./media/galaxy-tabs'),
        // 'nexus-7': require('./media/nexus-7'),
        // 'nexus-8': require('./media/nexus-7'),
        // 'nexus-9': require('./media/nexus-9'),
        // 'kindle-fire-hd-7': require('./media/kindle-fire-hd-7'),
        // 'kindle-fire-hd-8': require('./media/kindle-fire-hd-8')
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVkaWEuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDYjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsYUFBYSxFQUFFLEdBQUc7SUFFbEI7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksRUFBRSxRQUFRO0lBRXRCLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUU7WUFDTixXQUFXLEVBQUUsSUFBSTtZQUNqQixXQUFXLEVBQUUsR0FBRztTQUNqQjtRQUVELE1BQU07UUFDTixvQ0FBb0M7UUFDcEMseUNBQXlDO1FBQ3pDLDJCQUEyQjtRQUMzQiwwREFBMEQ7UUFDMUQsS0FBSztRQUNMLHdFQUF3RTtRQUN4RSxLQUFLO1FBQ0wsd0JBQXdCO1FBQ3hCLG9HQUFvRztRQUNwRyxNQUFNO1FBQ04sdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLEtBQUs7UUFFTCxNQUFNO1FBQ04scUNBQXFDO1FBQ3JDLHlDQUF5QztRQUN6QywyQkFBMkI7UUFDM0IsMERBQTBEO1FBQzFELEtBQUs7UUFDTCx5RUFBeUU7UUFDekUsS0FBSztRQUNMLHdCQUF3QjtRQUN4QixvR0FBb0c7UUFDcEcsTUFBTTtRQUNOLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLDhCQUE4QjtRQUM5QixLQUFLO1FBRUw7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNOLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCO1FBRUQsTUFBTTtRQUNOLG9DQUFvQztRQUNwQyx5Q0FBeUM7UUFDekMsMkJBQTJCO1FBQzNCLDBEQUEwRDtRQUMxRCxLQUFLO1FBQ0wsd0VBQXdFO1FBQ3hFLEtBQUs7UUFDTCx3QkFBd0I7UUFDeEIsb0dBQW9HO1FBQ3BHLE1BQU07UUFDTix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qiw0QkFBNEI7UUFDNUIsS0FBSztRQUVMLE1BQU07UUFDTixxQ0FBcUM7UUFDckMseUNBQXlDO1FBQ3pDLDJCQUEyQjtRQUMzQiwyREFBMkQ7UUFDM0QsS0FBSztRQUNMLHlFQUF5RTtRQUN6RSxLQUFLO1FBQ0wsd0JBQXdCO1FBQ3hCLG9HQUFvRztRQUNwRyxNQUFNO1FBQ04sd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsOEJBQThCO1FBQzlCLEtBQUs7UUFFTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLElBQUk7U0FDbEI7UUFFRCw4QkFBOEI7UUFDOUIsOENBQThDO1FBQzlDLCtDQUErQztRQUUvQyxxREFBcUQ7UUFDckQsc0RBQXNEO1FBQ3RELHNEQUFzRDtRQUN0RCx1REFBdUQ7UUFFdkQsa0RBQWtEO1FBQ2xELG1EQUFtRDtRQUNuRCxrREFBa0Q7UUFDbEQsa0RBQWtEO1FBRWxELG1EQUFtRDtRQUNuRCxtREFBbUQ7UUFDbkQsbURBQW1EO1FBRW5ELDJDQUEyQztRQUUzQyw2Q0FBNkM7UUFFN0Msc0RBQXNEO1FBQ3RELHNEQUFzRDtRQUN0RCx5REFBeUQ7UUFFekQsNkNBQTZDO1FBRTdDLG1DQUFtQztRQUNuQywyQ0FBMkM7UUFFM0MseUNBQXlDO1FBRXpDLHVDQUF1QztRQUV2QyxrREFBa0Q7UUFDbEQsa0RBQWtEO1FBQ2xELHFEQUFxRDtRQUNyRCxvREFBb0Q7UUFFcEQsOENBQThDO1FBQzlDLDhDQUE4QztRQUM5QyxpREFBaUQ7UUFFakQsK0NBQStDO1FBRS9DLCtDQUErQztRQUUvQyxpREFBaUQ7UUFDakQsaURBQWlEO1FBRWpELHlDQUF5QztRQUN6Qyx5Q0FBeUM7UUFFekMseUNBQXlDO1FBRXpDLDJEQUEyRDtRQUMzRCwwREFBMEQ7S0FDM0Q7Q0FDRixDQUFDIn0=