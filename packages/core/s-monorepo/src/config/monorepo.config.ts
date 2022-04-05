export default function (env, config) {
    if (env.platform !== 'node') return;

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
