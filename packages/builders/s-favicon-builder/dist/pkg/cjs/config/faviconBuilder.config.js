"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            input
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         [config.storage.src.rootDir]/favicon/favicon.png
         *
         * Specify where the favicon source file is stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.rootDir}/favicon/favicon.png`;
        },
        /**
         * @name            outDir
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         [config.storage.dist.rootDir]/favicon
         *
         * Specify where the favicon output files have to be stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return `${api.config.storage.dist.rootDir}/favicon`;
        },
        /**
         * @name            outFileName
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         favicon.html
         *
         * Specify the filename of the html file that contains all the favicon code
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outFileName() {
            return `favicon.html`;
        },
        /**
         * @name            settings
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         {}
         *
         * Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        settings: {},
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksS0FBSztZQUNMLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxzQkFBc0IsQ0FBQztRQUNuRSxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxVQUFVLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFdBQVc7WUFDWCxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxFQUFFO0tBQ2YsQ0FBQztBQUNOLENBQUM7QUE5REQsNEJBOERDIn0=