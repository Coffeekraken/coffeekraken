export default function (env, config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBRWpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsOEJBQThCO1FBRXJDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUM7S0FDL0MsQ0FBQztBQUNOLENBQUMifQ==