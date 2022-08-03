"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            glob
         * @namespace       config.testinator
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
         * @namespace       config.testinator
         * @type            String
         * @default         [config.storage.src.rootDir]
         *
         * Specify a directory from where to search for ts and js files to build
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get inDir() {
            return api.config.storage.src.rootDir;
        },
        /**
         * @name            exclude
         * @namespace       config.testinator
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzFDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO0tBQy9DLENBQUM7QUFDTixDQUFDO0FBN0NELDRCQTZDQyJ9