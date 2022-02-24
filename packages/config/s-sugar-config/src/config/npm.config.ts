export default function (env) {
    if (env.platform !== 'node') return;

    return {
        /**
         * @name            rootDir
         * @namespace       config.npm
         * @type            String
         * @default         [config.storage.package.rootDir]/node_modules
         *
         * Specify the "node_modules" directory path
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        rootDir: `[config.storage.package.rootDir]/node_modules`,
    };
}
