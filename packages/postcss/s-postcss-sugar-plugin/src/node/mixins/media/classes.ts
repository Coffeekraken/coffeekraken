import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to automatically generate the requested media query as well
 * as updating all the direct child classnames so you will have classes that applies
 * only for these media queries.
 *
 * Take this as an example:
 *
 * ```css
 * \@sugar.media.classes {
 *    .my-cool-element {
 *      color: green;
 *    }
 * }
 * ```
 *
 * This wil generate these two classes:
 * - .my-cool-element: Always available
 * - .my-cool-element___mobile: Available only in the mobile media query context
 * - etc...
 *
 * Note that you can use the @sugar.media mixin parameters syntax here in the first argument.
 *
 * @param         {String}      query
 * @return        {Css}         The generated css
 *
 * @example         css
 * \@sugar.media.classes {
 *    // any classes you want to "duplicate" and generate
 *    // only for this media context...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginMediaClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                default: Object.keys(__STheme.get('media.queries')).join(','),
            },
        };
    }
}

export interface IPostcssSugarPluginMediaMixinClassesParams {
    query: string;
}

export { postcssSugarPluginMediaClassesMixinInterface as interface };

const _mediasObj = {};
let _postProcessorRegistered = false;

export default function ({
    params,
    atRule,
    getRoot,
    postcssApi,
    postcss,
    registerPostProcessor,
    nodesToString,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
    atRule: any;
    getRoot: Function;
    postcssApi: any;
    postcss: any;
    registerPostProcessor: Function;
    nodesToString: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginMediaMixinClassesParams = {
        query: '',
        ...params,
    };

    const mediaConfig = __STheme.get('media');

    const medias = finalParams.query
        ? finalParams.query.split(/[\s,\,]/gm).map((l) => l.trim())
        : Object.keys(mediaConfig.queries);

    if (!_postProcessorRegistered) {
        _postProcessorRegistered = true;

        registerPostProcessor((root) => {
            let inMedia, mediaRule;

            const rootNodes = [...root.nodes];

            rootNodes.forEach((node) => {
                if (
                    node.type === 'comment' &&
                    node.text.trim().match(/^\!\sSMEDIA:[a-zA-Z0-9]+$/)
                ) {
                    inMedia = node.text.split(':')[1];
                    mediaRule = new postcssApi.AtRule({
                        name: 'media',
                        params: __STheme
                            .buildMediaQuery(inMedia)
                            .replace('@media ', ''),
                    });
                    node.replaceWith(mediaRule);
                    return;
                }
                if (
                    node.type === 'comment' &&
                    node.text.trim().match(/^\!\sSENDMEDIA:[a-zA-Z0-9]+$/)
                ) {
                    inMedia = null;
                    mediaRule = null;
                    node.remove();
                    return;
                }
                if (inMedia) {
                    if (node.type === 'comment') return;
                    if (node.selector === ':root') return;

                    if (!node.selector) {
                        mediaRule.append(node);
                    } else {
                        let sels = node.selector
                            .split(',')
                            .map((l) => l.trim());
                        sels = sels.map((sel) => {
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors) return sel;
                            selectors.forEach((selector) => {
                                sel = sel.replace(
                                    selector,
                                    `${selector}___${inMedia}`,
                                );
                            });
                            return sel;
                        });
                        node.selector = sels.join(',');
                        mediaRule.append(node);
                    }
                }
            });
        });
    }

    let refChildNode = atRule;

    medias.forEach((media) => {
        refChildNode.parent.insertBefore(
            refChildNode,
            postcss.parse(`/*! SMEDIA:${media} */`),
        );

        atRule.nodes.forEach((node) => {
            const clonedNode = node.clone();
            refChildNode.parent.insertAfter(refChildNode, clonedNode);
            refChildNode = clonedNode;
        });

        refChildNode.parent.insertAfter(
            refChildNode,
            postcss.parse(`/*! SENDMEDIA:${media} */`),
        );
    });

    atRule.remove();
}
