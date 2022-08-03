"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name            glob
         * @namespace       config.jestTester
         * @type            String
         * @default         ['** /*.{ts,js}']
         *
         * Specify a glob pattern relative to the "inDir" to specify files you want to compress
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        glob: ['**/*.ts'],
        /**
         * @name            inDir
         * @namespace       config.jestTester
         * @type            String
         * @default         [config.storage.src.rootDir]
         *
         * Specify a directory from where to search for ts and js files to build
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        inDir: '[config.storage.src.rootDir]',
        /**
         * @name            exclude
         * @namespace       config.jestTester
         * @type            String[]
         * @default         ['** /node_module']
         *
         * Specify some glob patterns for files/folders you want to exclude of the build process
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        exclude: ['**/node_modules', '**/__tests__'],
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLDhCQUE4QjtRQUVyQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO0tBQy9DLENBQUM7QUFDTixDQUFDO0FBM0NELDRCQTJDQyJ9