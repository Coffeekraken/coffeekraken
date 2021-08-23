import __fs from 'fs';

/**
 * @name            importCssPlugin
 * @namespace       node.plugins
 * @type            Function
 *
 * This vite plugin allows you to rewrite some code simply by specifying
 * which files have to be touched using the ```match``` property and
 * a ```rewrite``` function that has to return the new code to be used.
 *
 * @example         js
 * import { rewritePlugin } from '@coffeekraken/s-vite';
 * // vite.config.js
 * {
 *     ...
 *     plugins: [
 *      rewritePlugin([{
 *          match: /something\.js$/,
 *          rewrite(src, id) {
 *              return 'hello world';
 *          }
 *      }])
 *    ]
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IimportCssPluginRewrite {
    match: RegExp;
    rewrite(src: string, id: string): string;
}

function importCssPlugin() {
    return {
        name: 'vite-import-css',

        apply: 'build',
        enforce: 'post',

        // resolveId(id) {
        //     console.log('ID', id);
        // },

        transform(src, id) {
            if (!id.match(/\.(js|jsx|ts|tsx|riot|vue|svelte)$/)) return;

            // const matches = src.match(/import\s?\".*\.css\"/gm);

            console.log(src);

            // if (matches) {
            //     matches.forEach(match => {
            //         const path = match.replace(/import\s?\"/, '').replace('"','');
            //         const css = __fs.readFileSync(path, 'utf8').toString();
            //         console.log(css);
            //     });
            // }

            return {
                code: src,
                map: null,
            };
        },
        load(id) {
            console.log(id);
        },
    };
}

export default importCssPlugin();
