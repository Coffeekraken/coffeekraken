import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';

export async function preprocess(api) {
    return __deepMerge(
        Object.assign({}, api.this),
        (await __loadConfigFile('postcss.config.js')) ?? {},
        (await __loadConfigFile('.postcssrc.json')) ?? {},
    );
}

export default function (api) {
    if (api.env.platform !== 'node') return;

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
            // 'postcss-import',
            // 'postcss-nested',
            // 'postcss-atroot',
            // 'postcss-extend-rule',
            // 'postcss-property-lookup',
            'autoprefixer',
        ],
        pluginsOptions: {},
    };
}
