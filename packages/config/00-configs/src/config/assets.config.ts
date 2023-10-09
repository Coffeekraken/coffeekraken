export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }

    return {
        /**
         * @name            dev
         * @namespace       config.assets
         * @type            String
         * @default         { type: 'module', defer: true, src: '/src/js/index.ts', env: 'development' }
         *
         * Specify the development javascript index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        dev: {
            type: 'module',
            defer: true,
            src: '/src/js/index.ts',
            env: 'development',
        },

        /**
         * @name            module
         * @namespace       config.assets
         * @type            String
         * @default         { type: 'module', defer: true, src: '/dist/js/index.esm.js', env: 'production' }
         *
         * Specify the production javascript module index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        module: {
            type: 'module',
            defer: true,
            src: '/dist/js/index.esm.js',
            env: 'production',
        },

        /**
         * @name            style
         * @namespace       config.assets
         * @type            String
         * @default         { defer: true, src: '/dist/css/index.css' }
         *
         * Specify the production style index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        style: {
            id: 'global',
            defer: true,
            src: '/dist/css/index.css',
        },
    };
}
