export default function (env, config) {
    return {
        browser: {
            /**
             * @name            include
             * @namespace       config.config.browser.include
             * @type            Array<String>
             * @default         ['contact', 'datetime', 'log', 'serve', 'env', 'theme']
             *
             * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            include: ['contact', 'datetime', 'log', 'serve', 'env', 'theme'],
        },
        node: {
            /**
             * @name            include
             * @namespace       config.config.node.include
             * @type            Array<String>
             * @default         [storage.package.cacheDir]/config
             *
             * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            include: [],
        },
        cacheDir: '[config.storage.package.cacheDir]/config',
    };
}
