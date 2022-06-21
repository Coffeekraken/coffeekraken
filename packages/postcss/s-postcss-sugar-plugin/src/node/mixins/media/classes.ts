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
    getCacheFilePath,
    getRoot,
    postcssApi,
    registerPostProcessor,
    nodesToString,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
    atRule: any;
    getCacheFilePath: Function;
    getRoot: Function;
    postcssApi: any;
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

    medias.forEach((media) => {
        if (!_mediasObj[media]) {
            _mediasObj[media] = [];
        }
        if (!atRule._sMedia) {
            atRule._sMedia = [];
        }
        if (atRule._sMedia.includes(media)) {
            return;
        }
        atRule._sMedia.push(media);
        _mediasObj[media].push(atRule);
        // _mediasObj[media].push(node);
    });
    // getRoot(atRule).insertBefore(atRule, node);

    // atRule.replaceWith(`
    //     /* S-MEDIA-CLASSES:${medias.join(',')} */
    //     ${nodesToString(atRule.nodes)}
    //     /* S-MEDIA-CLASSES-END:${medias.join(',')} */
    // `);

    if (!_postProcessorRegistered) {
        _postProcessorRegistered = true;

        registerPostProcessor((root) => {
            for (let [media, atRules] of Object.entries(_mediasObj)) {
                const mediaRule = new postcssApi.AtRule({
                    name: 'media',
                    params: __STheme
                        .buildMediaQuery(media)
                        .replace('@media ', ''),
                });
                // @ts-ignore
                atRules.forEach((atRule) => {
                    atRule.nodes.forEach((node) => {
                        node = node.clone();
                        if (node.type === 'comment') return;
                        if (node.selector === ':root') return;
                        if (!node.selector) {
                            mediaRule.append(node);
                        } else {
                            let sels = node.selector
                                .split(',')
                                .map((l) => l.trim());
                            sels = sels.map((sel) => {
                                const selectors = sel.match(
                                    /\.[a-zA-Z0-9_-]+/gm,
                                );
                                if (!selectors) return sel;
                                selectors.forEach((selector) => {
                                    sel = sel.replace(
                                        selector,
                                        `${selector}___${media}`,
                                    );
                                });
                                return sel;
                            });
                            node.selector = sels.join(',');
                            mediaRule.append(node);
                        }
                    });
                });
                root.append(mediaRule);
            }
        });
    }
}
