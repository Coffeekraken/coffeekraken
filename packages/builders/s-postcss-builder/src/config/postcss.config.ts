import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export async function preprocess({ env, thisConfig }) {
    return __deepMerge(
        Object.assign({}, thisConfig),
        (await __loadConfigFile('postcss.config.js')) ?? {},
        (await __loadConfigFile('.postcssrc.json')) ?? {},
    );
}

export default function ({ env, config }) {
    if (env.platform !== 'node') return;

    return {
        /**
         * @name            plugins
         * @namespace       config.postcss
         * @type            String
         * @default         ['@coffeekraken/s-postcss-sugar-plugin','postcss-nested','postcss-atroot','postcss-extend-rule','postcss-property-lookup','autoprefixer']
         *
         * Specify the plugins to use with the postcss process
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        plugins: [
            '@coffeekraken/s-postcss-sugar-plugin',
            'postcss-import',
            'postcss-nested',
            'postcss-atroot',
            'postcss-extend-rule',
            'postcss-property-lookup',
            'autoprefixer',
        ],
        pluginsOptions: {},
    };
}
