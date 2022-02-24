import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.media
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
                default: Object.keys(__STheme.config('media.queries')).join(',')
            },
            mediasOnly: {
                type: 'Boolean',
            },
        };
    }
}
export { postcssSugarPluginMediaClassesMixinInterface as interface };
export default function ({ params, atRule, getCacheFilePath, getRoot, postcssApi, registerPostProcessor, replaceWith, }) {
    const finalParams = Object.assign({ query: '', mediasOnly: false }, params);
    const mediaConfig = __STheme.config('media');
    const medias = finalParams.query
        ? finalParams.query.split(' ').map((l) => l.trim())
        : Object.keys(mediaConfig.queries);
    atRule.replaceWith(`
        /* S-MEDIA-CLASSES:${medias.join(',')} */
        ${atRule.nodes.map(node => node.toString())}
        /* S-END-MEDIA-CLASSES:${medias.join(',')} */
    `);
    registerPostProcessor((root) => {
        const mediaNodes = [];
        let currentMedias = [];
        root.nodes.forEach((node, i) => {
            if (node.type === 'comment' && node.text.includes('S-MEDIA-CLASSES:')) {
                const medias = node.text.replace('S-MEDIA-CLASSES:', '').split(',').map(l => l.trim());
                currentMedias = medias;
                mediaNodes.push({
                    nodes: [],
                    medias
                });
            }
            else if (node.type === 'comment' && node.text.includes('S-END-MEDIA-CLASSES:')) {
                const medias = node.text.replace('S-END-MEDIA-CLASSES:', '').split(',').map(l => l.trim());
                currentMedias = [];
            }
            else if (currentMedias.length) {
                const mediaNodeObj = mediaNodes.slice(-1)[0];
                // @ts-ignore
                mediaNodeObj.nodes.push(node.clone());
            }
        });
        mediaNodes.forEach(mediaObj => {
            mediaObj.medias.forEach((media) => {
                const mediaRule = new postcssApi.AtRule({
                    name: 'media',
                    params: __STheme.buildMediaQuery(media).replace('@media ', ''),
                });
                mediaObj.nodes.forEach(node => {
                    node = node.clone();
                    if (node.type === 'comment')
                        return;
                    if (node.selector === ':root')
                        return;
                    if (!node.selector) {
                        mediaRule.append(node);
                    }
                    else {
                        let sels = node.selector.split(',').map(l => l.trim());
                        sels = sels.map(sel => {
                            // sel = sel.replace(/___[a-zA-Z0-9_-]+/gm, '');
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors)
                                return sel;
                            selectors.forEach(selector => {
                                sel = sel.replace(selector, `${selector}___${media}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFHN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVILE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ25FO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxVQUFVLEVBQ1YscUJBQXFCLEVBQ3JCLFdBQVcsR0FTZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULFVBQVUsRUFBRSxLQUFLLElBQ2QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTdDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLO1FBQzVCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJ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