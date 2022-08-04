export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBRWpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEtBQUs7WUFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDMUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUM7S0FDL0MsQ0FBQztBQUNOLENBQUMifQ==