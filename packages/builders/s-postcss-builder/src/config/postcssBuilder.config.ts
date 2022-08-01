export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        /**
         * @name            input
         * @namespace       config.postcssBuilder
         * @type            String
         * @default         [config.storage.src.cssDir]/index.css
         *
         * Specify the input file to use for building your postcss
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.cssDir}/index.css`;
        },

        /**
         * @name            output
         * @namespace       config.postcssBuilder
         * @type            String
         * @default         [config.storage.dist.cssDir]/index.css
         *
         * Specify the output file to save your builded postcss
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get output() {
            return `${api.config.storage.dist.cssDir}/index.css`;
        },

        /**
         * @name            postcss
         * @namespace       config.postcssBuilder
         * @type            Object
         * @default         [config.postcss]
         *
         * Specify the postcss compiler configuration
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get postcss() {
            return api.config.postcss;
        },

        /**
         * @name            purgecss
         * @namespace       config.postcssBuilder
         * @type            Object
         * @default         [config.purgecss]
         *
         * Specify the purgecss compiler configuration
         *
         * @since       2.0.0
         * @author         Oli vier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get purgecss() {
            return api.config.purgecss;
        },
    };
}
