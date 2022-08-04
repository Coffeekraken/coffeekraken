"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            glob
         * @namespace       config.typescriptBuilder
         * @type            String
         * @default         [config.typescriptBuilder.inDir]/** /*
         *
         * Specify a glob pattern relative to the "inDir" to specify files you want to compress
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        glob: ['js/**/*.ts', '(node|shared|config|cli)/**/*.ts'],
        /**
         * @name            inDir
         * @namespace       config.typescriptBuilder
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
         * @name            outDir
         * @namespace       config.typescriptBuilder
         * @type            String
         * @default         [config.storage.dist.rootDir]/pkg/%moduleSystem
         *
         * Specify a directory where you want to put the builded files.
         * You can use the %moduleSystem and %platform token in your value
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return `${api.config.storage.dist.rootDir}/pkg/%moduleSystem`;
        },
        /**
         * @name            formats
         * @namespace       config.typescriptBuilder
         * @type            String[]
         * @default         ['esm','cjs']
         *
         * Specify the formats you want to generate. Can be "esm" or/and "cjs"
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        formats: ['esm', 'cjs'],
        /**
         * @name            platform
         * @namespace       config.typescriptBuilder
         * @type            String[]
         * @default         node
         *
         * Specify for which platform you want to build the typescript files. Can be "browser" or "node".
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        platform: 'node',
        /**
         * @name            customSettings
         * @namespace       config.typescriptBuilder
         * @type            String[]
         * @default         {}
         *
         * Specify some custom settings for the typescript builder based on the glob pattern used as property
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        customSettings: {},
        /**
         * @name            exclude
         * @namespace       config.typescriptBuilder
         * @type            String[]
         * @default         ['** /node_module']
         *
         * Specify some glob patterns for files/folders you want to exclude of the build process
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        exclude: ['**/node_modules'],
        /**
         * @name            tsconfig
         * @namespace       config.typescriptBuilder
         * @type            String[]
         * @default         [config.ts]
         *
         * Specify some tsconfig configurations.
         *
         * @see           https://www.typescriptlang.org/tsconfig
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get tsconfig() {
            var _a;
            return (_a = api.config.ts) !== null && _a !== void 0 ? _a : {};
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxrQ0FBa0MsQ0FBQztRQUV4RDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzFDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxvQkFBb0IsQ0FBQztRQUNsRSxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7UUFFdkI7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxNQUFNO1FBRWhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxjQUFjLEVBQUUsRUFBRTtRQUVsQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFFNUI7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLFFBQVE7O1lBQ1IsT0FBTyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxtQ0FBSSxFQUFFLENBQUM7UUFDL0IsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBcEhELDRCQW9IQyJ9