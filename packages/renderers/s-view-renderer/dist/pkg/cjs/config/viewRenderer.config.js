"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
            const dirs = [`${api.config.storage.src.rootDir}/views`];
            return dirs;
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQztZQUN6RCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxRQUFRLENBQUM7UUFDMUQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUUsTUFBTTtRQUVyQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsNENBQTRDO1lBQzVDLDJDQUEyQztZQUMzQywwQ0FBMEM7U0FDN0M7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxlQUFlO1lBQ2YsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sdUJBQXVCLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO0tBQ25ELENBQUM7QUFDTixDQUFDO0FBN0ZELDRCQTZGQyJ9