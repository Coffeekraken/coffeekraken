export default function (env, config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFLENBQUMsMkJBQTJCLENBQUM7UUFFNUM7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQWMsRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7S0FDcEQsQ0FBQztBQUNOLENBQUMifQ==