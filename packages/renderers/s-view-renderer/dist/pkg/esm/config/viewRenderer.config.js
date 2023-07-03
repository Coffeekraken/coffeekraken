export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            rootDirs
         * @namespace       config.viewRenderer
         * @type            string[]
         * @default          ['[config.storage.src.rootDir]/views']
         *
         * Specify the roots views directories
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get rootDirs() {
            return [
                // ...(api.parent.rootDirs ?? []),
                `${api.config.storage.src.rootDir}/views`,
            ];
        },
        /**
         * @name            cacheDir
         * @namespace       config.viewRenderer
         * @type            String
         * @default          [config.storage.package.cacheDir]
         *
         * Specify the views template rendering cache directory
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get cacheDir() {
            return `${api.config.storage.package.cacheDir}/views`;
        },
        /**
         * @name          defaultEngine
         * @namespace     config.viewRenderer
         * @type          String
         * @default       twig
         *
         * Store which engine to use when no any is specified at the dotpath start like "twig://...", "blade://...", etc...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultEngine: 'twig',
        /**
         * @name          engines
         * @namespace     config.viewRenderer
         * @type          String[]
         * @default       ['@coffeekraken/s-view-renderer-engine-blade', '@coffeekraken/s-view-renderer-engine-twig']
         *
         * Store which engines are available for this renderer
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        engines: [
            '@coffeekraken/s-view-renderer-engine-blade',
            '@coffeekraken/s-view-renderer-engine-twig',
            '@coffeekraken/s-view-renderer-engine-lit',
        ],
        /**
         * @name          sharedDataFiles
         * @namespace     config.viewRenderer
         * @type          String[]
         * @default       ['[config.storage.src.rootDir]/views/shared.data.js']
         *
         * Store paths to shared data files that will be loaded by the proper dataHandler
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get sharedDataFiles() {
            return [`${api.config.storage.src.rootDir}/views/shared.data.js`];
        },
        /**
         * @name          dataFiles
         * @namespace     config.viewRenderer
         * @type          String[]
         * @default       ['@coffeekraken/s-data-file-generic']
         *
         * Store which data handlers are available for this renderer
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        dataFiles: ['@coffeekraken/s-data-file-generic'],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxRQUFRO1lBQ1IsT0FBTztnQkFDSCxrQ0FBa0M7Z0JBQ2xDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUTthQUM1QyxDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7WUFDUixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsUUFBUSxDQUFDO1FBQzFELENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFLE1BQU07UUFFckI7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNMLDRDQUE0QztZQUM1QywyQ0FBMkM7WUFDM0MsMENBQTBDO1NBQzdDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksZUFBZTtZQUNmLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLHVCQUF1QixDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztLQUNuRCxDQUFDO0FBQ04sQ0FBQyJ9