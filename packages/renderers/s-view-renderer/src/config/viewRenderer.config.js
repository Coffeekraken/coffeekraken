export default function (env, config) {
    if (env.platform !== 'node')
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
        rootDirs: [`[config.storage.src.rootDir]/views`],
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
        cacheDir: `[config.storage.package.cacheDir]/views`,
        /**
         * @name          engines
         * @namespace     config.viewRenderer
         * @type          String[]
         * @default       ['@coffeekraken/s-view-renderer-engine-blade']
         *
         * Store which engines are available for this renderer
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        engines: ['@coffeekraken/s-view-renderer-engine-blade'],
        /**
          * @name          dataHandlers
          * @namespace     config.viewRenderer
          * @type          String[]
          * @default       ['@coffeekraken/s-view-renderer-data-handler-json']
          *
          * Store which data handlers are available for this renderer
          *
          * @since       2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
          */
        dataHandlers: ['@coffeekraken/s-view-renderer-data-handler-js'],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1JlbmRlcmVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXdSZW5kZXJlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztRQUVoRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLHlDQUF5QztRQUVuRDs7Ozs7Ozs7OztXQVVHO1FBQ0osT0FBTyxFQUFFLENBQUMsNENBQTRDLENBQUM7UUFFdkQ7Ozs7Ozs7Ozs7WUFVSTtRQUNILFlBQVksRUFBRSxDQUFDLCtDQUErQyxDQUFDO0tBQ2xFLENBQUM7QUFDTixDQUFDIn0=