import { registerPreprocessor } from '@riotjs/compiler';
import postcss from 'postcss';

/**
 * @name            sRiotjsPluginPostcssPreprocessor
 * @namespace       node
 * @type            Function
 *
 * This riot preprocessor allows you to use postcss inside your component
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function sRiotjsPluginPostcssPreprocessor(
    postcssPlugins: any[],
) {
    // @ts-ignore
    registerPreprocessor('css', 'postcss', async function (code) {
        // resolve plugins paths
        const plugins: any[] = [];
        for (let i = 0; i < postcssPlugins.length; i++) {
            const p = postcssPlugins[i];
            if (typeof p === 'string') {
                const { default: plug } = await import(p);
                plugins.push(plug.default ?? plug);
            } else {
                plugins.push(p);
            }
        }

        const result = await postcss(plugins).process(code);

        return {
            code: result.css,
            map: null,
        };
    });
}
