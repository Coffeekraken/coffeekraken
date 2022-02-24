
/**
 * @name            rewritesPlugin
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IRewritesPluginRewrite {
  match: RegExp;
  rewrite(src: string, id: string): string;
}

export default function rewritesPlugin(rewrites: IRewritesPluginRewrite[]) {
  return {
    name: 'rewrites-plugin',
    async transform(src, id) {
      for (let i = 0; i < rewrites.length; i++) {
        let rewriteObj = rewrites[i];

        // resolve pathes
        if (typeof rewriteObj === 'string') {
          const { default: re } = await import(rewriteObj);
          rewriteObj = re;
        }

        if (!src.match(rewriteObj.match)) continue;
        return {
          code: rewriteObj.rewrite(src, id),
          map: null
        };
      }

      return {
        code: src,
        map: null
      };
    }
  };
}
