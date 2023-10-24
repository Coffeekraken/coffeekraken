import __SInterface from '@coffeekraken/s-interface';
import __SMedia from '@coffeekraken/s-media';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           media
 * @as              @s.media
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply any media queries that are defined
 * in the config.theme.media.queries configuration stack like "tablet", "mobile", etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 * @return      {Css}         The generated css
 *
 * @snippet         @s.media $1
 * @s.media $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.media >=desktop {
 *      // ...
 * }
 * @s.media tablet {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    postcssApi,
    registerPostProcessor,
}: {
    params: any;
    atRule: any;
    postcssApi: any;
    registerPostProcessor: Function;
}) {
    const finalParams = {
        ...(params ?? {}),
    };

    const media = new __SMedia();

    const buildedQuery = media.buildQuery(finalParams.query, {
        method: 'media',
    });

    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: buildedQuery.replace(/^\@media\s/, ''),
        nodes: atRule.nodes,
    });

    atRule.replaceWith(mediaRule);
}
