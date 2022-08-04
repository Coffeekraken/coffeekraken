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
export default function ({ params, atRule, getCacheFilePath, getRoot, postcssApi, registerPostProcessor, nodesToString, replaceWith, }) {
    const finalParams = Object.assign({ query: '' }, params);
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
                                    sel = sel.replace(selector, `${selector}___${media}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNoRTtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBRXJDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLFVBQVUsRUFDVixxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSztRQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxD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