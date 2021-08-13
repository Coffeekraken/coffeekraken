export default function (env) {
    if (env.platform !== 'node') return {};

    return {
        /**
         * @name            rootDir
         * @namespace       sugar.config.npm
         * @type            String
         * @default         `${__packageRoot()}/node_modules`
         *
         * Specify the "node_modules" directory path
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: `[config.storage.package.rootDir]/node_modules`,
    };
}
