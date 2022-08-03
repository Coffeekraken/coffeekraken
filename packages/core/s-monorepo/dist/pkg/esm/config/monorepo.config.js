export default function (api) {
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
             * @default     ['version']
             *
             * Specify some fields to upgrade in each packages files
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fields: ['version'],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLElBQUk7UUFFYjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsWUFBWSxFQUFFLGNBQWM7UUFFNUIsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7WUFFeEM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN0QjtLQUNKLENBQUM7QUFDTixDQUFDIn0=