"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name        rootDir
         * @namespace   config.monorepo
         * @type       String
         * @default     null
         *
         * Specify the root of the monorepo. If not set, it will be computed from the current working directory
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        rootDir: null,
        /**
         * @name        packagesGlob
         * @namespace   config.monorepo
         * @type       string
         * @default     packages/* /*
         *
         * Specify some globs to search for packages relative to the monorepo root directory.
         * !!! target folders and not a package.json file, etc...
         * The "packages/@..." folders are excluded cause they have as goal to store the none-distributed
         * "projects".
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        packagesGlob: 'packages/*/*',
        upgrade: {
            /**
             * @name        files
             * @namespace   config.monorepo.upgrade
             * @type       string[]
             * @default     ['package.json','composer.json']
             *
             * Specify some files to upgrade in each packages when doing a monorepo.upgrade call
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            files: ['package.json', 'composer.json'],
            /**
             * @name        fields
             * @namespace   config.monorepo.upgrade
             * @type       string[]
             * @default     ['version','homepage']
             *
             * Specify some fields to upgrade in each packages files
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fields: ['version', 'homepage'],
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxJQUFJO1FBRWI7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILFlBQVksRUFBRSxjQUFjO1FBRTVCLE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDO1lBRXhDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1NBQ2xDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE3REQsNEJBNkRDIn0=