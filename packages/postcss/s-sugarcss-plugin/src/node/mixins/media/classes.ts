import __SInterface from '@coffeekraken/s-interface';
import __SMedia from '@coffeekraken/s-media';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @s.media.classes
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin allows you to automatically generate the requested media query as well
 * as updating all the direct child classnames so you will have classes that applies
 * only for these media queries.
 *
 * Take this as an example:
 *
 * ```css
 * @s.media.classes(mobile) {
 *    .my-cool-element {
 *      color: green;
 *    }
 * }
 * ```
 *
 * This wil generate these classes:
 * - .my-cool-element___mobile: Available only in the mobile media query context
 * - etc...
 *
 * Note that you can use the @s.media mixin parameters syntax here in the first argument.
 *
 * @param         {String}      query
 * @return        {Css}         The generated css
 *
 * @example         css
 * @s.media.classes(mobile) {
 *    // only for this media context...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginMediaClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                default: Object.keys(
                    __STheme.current.get('media.queries'),
                ).join(','),
            },
        };
    }
}

export interface ISSugarcssPluginMediaMixinClassesParams {
    query: string;
}

export { SSugarcssPluginMediaClassesMixinInterface as interface };

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
    params: Partial<ISSugarcssPluginMediaMixinClassesParams>;
    atRule: any;
    getRoot: Function;
    postcssApi: any;
    postcss: any;
    registerPostProcessor: Function;
    nodesToString: Function;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginMediaMixinClassesParams = {
        query: '',
        ...params,
    };

    const mediaConfig = __STheme.current.get('media');

    const medias = finalParams.query
        ? finalParams.query.split(/[\s,\,]/gm).map((l) => l.trim())
        : Object.keys(mediaConfig.queries);

    const sortedMedias = [];
    Object.keys(mediaConfig.queries ?? {}).forEach((m) => {
        if (medias.includes(m)) {
            sortedMedias.push(m);
        }
    });

    registerPostProcessor((root) => {
        root.nodes.forEach((node) => {
            if (node.name === 'media' && node._sMedia) {
                node.nodes = [
                    ...node.nodes.map((n) => {
                        if (!n.selector) {
                            return n;
                        }
                        let sels = n.selector.split(',').map((l) => l.trim());
                        sels = sels.map((sel) => {
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors) return sel;
                            selectors.forEach((selector) => {
                                const reg = new RegExp(`_${node._sMedia}$`);
                                if (reg.test(selector)) {
                                    return;
                                }
                                sel = sel.replace(
                                    selector,
                                    `${selector}_${node._sMedia}`,
                                );
                            });
                            return sel;
                        });
                        n.selector = sels.join(',');
                        return n;
                    }),
                ];
            }
        });
    });

    let refNode = atRule;
    atRule._sMediaRule = true;

    const mediaInstance = new __SMedia();

    sortedMedias.forEach((media) => {
        const newRule = refNode.clone();
        newRule.name = 'media';
        newRule.params = `${mediaInstance
            .buildQuery(media, {
                method: 'media',
            })
            .replace('@media ', '')}`;
        newRule._sMedia = media;
        refNode.parent.insertAfter(refNode, newRule);
        if (refNode.name.startsWith('s.')) {
            refNode.remove();
        }
        refNode = newRule;
    });
}
