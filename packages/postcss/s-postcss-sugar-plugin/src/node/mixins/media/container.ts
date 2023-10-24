import __SInterface from '@coffeekraken/s-interface';
import __SMedia from '@coffeekraken/s-media';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginMediaContainerMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                required: true,
            },
            containerName: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginMediaContainerMixinInterface as interface };

/**
 * @name           container
 * @as              @s.media.container
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin allows you to apply a container query in your css.
 * If no containerName is passed, it will init the target itself as a the container to use for the query.
 *
 * @param       {String}        query       The query string like ">200", "<=500", etc...
 * @return      {Css}         The generated css
 *
 * @snippet         @s.media.container $1
 * @s.media.container $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.media.container >=200 {
 *      // ...
 * }
 * @s.media.container <=300 {
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
    const mediaConfig = __STheme.get('media');

    const finalParams = {
        containerName: null, // __uniqid().split('-').slice(0, 2).join('-')
        ...(params ?? {}),
    };

    if (!finalParams.query) {
        throw new Error(
            `<red>[@s.media]</red> You MUST provide a query in order to use the <yellow>@s.media</yellow> mixin...`,
        );
    }

    const media = new __SMedia();

    const buildedQuery = media.buildQuery(finalParams.query, {
        method: 'container',
        containerName: finalParams.containerName,
    });

    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: `container ${buildedQuery.replace(/^\@container\s/, '')}`,
        nodes: atRule.nodes,
    });

    // const containerDecl = new postcssApi.Declaration({
    //     prop: 'container-type',
    //     value: `inline-size`,
    // });

    // if (!params.containerName) {
    //     const parentWithSelector = __parentWithSelector(atRule);
    //     if (parentWithSelector) {
    //         parentWithSelector.append(containerDecl);
    //     }
    // }

    atRule.replaceWith(mediaRule);
}
