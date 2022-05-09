import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __fs from 'fs';

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
 * @return        {Css}         The generated css
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
            mediasOnly: {
                type: 'Boolean',
            },
        };
    }
}

export interface IPostcssSugarPluginMediaMixinClassesParams {
    query: string;
    mediasOnly: boolean;
}

export { postcssSugarPluginMediaClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    getCacheFilePath,
    getRoot,
    postcssApi,
    registerPostProcessor,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
    atRule: any;
    getCacheFilePath: Function;
    getRoot: Function;
    postcssApi: any;
    registerPostProcessor: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginMediaMixinClassesParams = {
        query: '',
        mediasOnly: false,
        ...params,
    };

    const mediaConfig = __STheme.get('media');

    const medias = finalParams.query
        ? finalParams.query.split(' ').map((l) => l.trim())
        : Object.keys(mediaConfig.queries);

    atRule.replaceWith(`
        /* S-MEDIA-CLASSES:${medias.join(',')} */
        ${atRule.nodes.map((node) => node.toString())}
        /* S-END-MEDIA-CLASSES:${medias.join(',')} */
    `);

    registerPostProcessor((root) => {
        const mediaNodes: any[] = [];
        let currentMedias = [];

        root.nodes.forEach((node, i) => {
            if (
                node.type === 'comment' &&
                node.text.includes('S-MEDIA-CLASSES:')
            ) {
                const medias = node.text
                    .replace('S-MEDIA-CLASSES:', '')
                    .split(',')
                    .map((l) => l.trim());
                currentMedias = medias;
                mediaNodes.push({
                    nodes: [],
                    medias,
                });
            } else if (
                node.type === 'comment' &&
                node.text.includes('S-END-MEDIA-CLASSES:')
            ) {
                const medias = node.text
                    .replace('S-END-MEDIA-CLASSES:', '')
                    .split(',')
                    .map((l) => l.trim());
                currentMedias = [];
            } else if (currentMedias.length) {
                const mediaNodeObj = mediaNodes.slice(-1)[0];
                // @ts-ignore
                mediaNodeObj.nodes.push(node.clone());
            }
        });

        mediaNodes.forEach((mediaObj) => {
            mediaObj.medias.forEach((media) => {
                const mediaRule = new postcssApi.AtRule({
                    name: 'media',
                    params: __STheme
                        .buildMediaQuery(media)
                        .replace('@media ', ''),
                });

                mediaObj.nodes.forEach((node) => {
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
                            // sel = sel.replace(/___[a-zA-Z0-9_-]+/gm, '');
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
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

                root.append(mediaRule);
            });
        });
    });
}
