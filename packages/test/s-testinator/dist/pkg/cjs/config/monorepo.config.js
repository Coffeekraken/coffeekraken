"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name        packagesGlobs
         * @namespace   config.monorepo
         * @type       string[]
         * @default     ['packages/* / * /package.json']
         *
         * Specify some globs to search for packages relative to the monorepo root directory
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        packagesGlobs: ['packages/*/*/package.json'],
        /**
         * @name        filesToUpgrade
         * @namespace   config.monorepo
         * @type       string[]
         * @default     ['package.json','composer.json']
         *
         * Specify some files to upgrade in each packages when doing a monorepo.upgrade call
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        filesToUpgrade: ['package.json', 'composer.json'],
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILGFBQWEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1FBRTVDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxjQUFjLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDO0tBQ3BELENBQUM7QUFDTixDQUFDO0FBOUJELDRCQThCQyJ9