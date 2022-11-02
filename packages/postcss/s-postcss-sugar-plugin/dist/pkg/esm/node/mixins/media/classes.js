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
export { postcssSugarPluginMediaClassesMixinInterface as interface };
const _mediasObj = {};
let _postProcessorRegistered = false;
export default function ({ params, atRule, getRoot, postcssApi, postcss, registerPostProcessor, nodesToString, replaceWith, }) {
    const finalParams = Object.assign({ query: '' }, params);
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
                if (node.type === 'comment' &&
                    node.text.trim().match(/^\!\sSMEDIA:[a-zA-Z0-9]+$/)) {
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
                if (node.type === 'comment' &&
                    node.text.trim().match(/^\!\sSENDMEDIA:[a-zA-Z0-9]+$/)) {
                    inMedia = null;
                    mediaRule = null;
                    node.remove();
                    return;
                }
                if (inMedia) {
                    if (node.type === 'comment')
                        return;
                    if (node.selector === ':root')
                        return;
                    if (!node.selector) {
                        mediaRule.append(node);
                    }
                    else {
                        let sels = node.selector
                            .split(',')
                            .map((l) => l.trim());
                        sels = sels.map((sel) => {
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors)
                                return sel;
                            selectors.forEach((selector) => {
                                sel = sel.replace(selector, `${selector}___${inMedia}`);
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
        refChildNode.parent.insertBefore(refChildNode, postcss.parse(`/*! SMEDIA:${media} */`));
        atRule.nodes.forEach((node) => {
            const clonedNode = node.clone();
            refChildNode.parent.insertAfter(refChildNode, clonedNode);
            refChildNode = clonedNode;
        });
        refChildNode.parent.insertAfter(refChildNode, postcss.parse(`/*! SENDMEDIA:${media} */`));
    });
    atRule.remove();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNoRTtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBRXJDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSztRQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFD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