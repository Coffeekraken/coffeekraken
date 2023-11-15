"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
/**
 * @name                    sugarcssPluginConfig
 * @as                      PostCSS Sugar plugin config
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-sugarcss-plugin available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            outDir
         * @namespace       config.sugarcssPlugin
         * @type            String
         * @default        __path.dirname(`${api.config.storage.dist.cssDir}/index.css`)
         *
         * Specify a directory in which to save relatively exported css, etc...
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return path_1.default.dirname(`${api.config.storage.dist.cssDir}/index.css`);
        },
        clean: {
            /**
             * @name            variables
             * @namespace       config.sugarcssPlugin.clean
             * @type            Boolean
             * @default         undefined
             *
             * Specify if you want to clean unused variables in your final css.
             * If is set to "undefined", it will be true only for production target build.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get variables() {
                return api.env.target === 'production';
            },
        },
        /**
         * @name            excludeByTypes
         * @namespace       config.sugarcssPlugin
         * @type            String[]
         * @default         []
         *
         * Specify some types of comments and code to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeByTypes: [],
        /**
         * @name            excludeCommentByTypes
         * @namespace       config.sugarcssPlugin
         * @type            String[]
         * @default         ['CssClass']
         *
         * Specify some types of comments to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeCommentByTypes: ['CssClass'],
        /**
         * @name            excludeCodeByTypes
         * @namespace       config.sugarcssPlugin
         * @type            String[]
         * @default         []
         *
         * Specify some types of code to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeCodeByTypes: [],
        /**
         * @name            viewsRootDirs
         * @namespace       config.sugarcssPlugin
         * @type            String[]
         * @default         []
         *
         * Specify where are stored the views to be able to import them in your css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get viewsRootDirs() {
            return api.config.viewRenderer.rootDirs;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQ2pCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWSxDQUNoRCxDQUFDO1FBQ04sQ0FBQztRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsSUFBSSxTQUFTO2dCQUNULE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssWUFBWSxDQUFDO1lBQzNDLENBQUM7U0FDSjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxjQUFjLEVBQUUsRUFBRTtRQUVsQjs7Ozs7Ozs7OztXQVVHO1FBQ0gscUJBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFFbkM7Ozs7Ozs7Ozs7V0FVRztRQUNILGtCQUFrQixFQUFFLEVBQUU7UUFFdEI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksYUFBYTtZQUNiLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQzVDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTdGRCw0QkE2RkMifQ==