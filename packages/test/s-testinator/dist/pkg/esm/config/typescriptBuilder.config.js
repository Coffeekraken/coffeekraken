export default function (env, config) {
    if (env.platform !== 'node')
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
        glob: ['js/**/*.ts', '(node|shared|config|pages|views|cli)/**/*.ts'],
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
        inDir: '[config.storage.src.rootDir]',
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
        outDir: '[config.storage.dist.rootDir]/pkg/%moduleSystem',
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
         * @default         ['** /node_module']
         *
         * Specify some custom settings for the typescript builder based on the glob pattern used as property
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        customSettings: {
            pages: {
                glob: '**/pages/**/*.ts',
                settings: {
                    outDir: '[config.storage.src.rootDir]',
                    formats: ['esm'],
                },
            },
        },
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
        tsconfig: '[config.ts]',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLDhDQUE4QyxDQUFDO1FBRXBFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsOEJBQThCO1FBRXJDOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsTUFBTSxFQUFFLGlEQUFpRDtRQUV6RDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUV2Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLE1BQU07UUFFaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQWMsRUFBRTtZQUNaLEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixRQUFRLEVBQUU7b0JBQ04sTUFBTSxFQUFFLDhCQUE4QjtvQkFDdEMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUNuQjthQUNKO1NBQ0o7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFFNUI7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxRQUFRLEVBQUUsYUFBYTtLQUMxQixDQUFDO0FBQ04sQ0FBQyJ9