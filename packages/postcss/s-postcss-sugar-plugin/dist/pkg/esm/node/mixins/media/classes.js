import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to automatically generate the requested media query as well
 * as updating all the direct child classnames so you will have classes that applies
 * only for these media queries.
 *
 * Take this as an example:
 *
 * ```css
 * \@sugar.media.classes(mobile) {
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
 * Note that you can use the @sugar.media mixin parameters syntax here in the first argument.
 *
 * @param         {String}      query
 * @return        {Css}         The generated css
 *
 * @example         css
 * \@sugar.media.classes(mobile) {
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
export default function ({ params, atRule, getRoot, postcssApi, postcss, registerPostProcessor, nodesToString, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ query: '' }, params);
    const mediaConfig = __STheme.get('media');
    const medias = finalParams.query
        ? finalParams.query.split(/[\s,\,]/gm).map((l) => l.trim())
        : Object.keys(mediaConfig.queries);
    const sortedMedias = [];
    Object.keys((_a = mediaConfig.queries) !== null && _a !== void 0 ? _a : {}).forEach((m) => {
        if (medias.includes(m)) {
            sortedMedias.push(m);
        }
    });
    registerPostProcessor((root) => {
        root.nodes.forEach((node) => {
            if (node._sMediaRule) {
                // node.remove();
            }
            if ((node.name === 'media' || node.name === 'container') &&
                node._sMedia) {
                node.nodes = [
                    ...node.nodes.map((n) => {
                        if (!n.selector) {
                            return n;
                        }
                        let sels = n.selector.split(',').map((l) => l.trim());
                        sels = sels.map((sel) => {
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors)
                                return sel;
                            selectors.forEach((selector) => {
                                sel = sel.replace(selector, `${selector}___${node._sMedia}`);
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
    sortedMedias.forEach((media) => {
        const newRule = refNode.clone();
        newRule.name = 'container';
        newRule.params = `viewport ${__STheme
            .buildMediaQuery(media)
            .replace('@media ', '')
            .replace('@container', '')}`;
        newRule._sMedia = media;
        refNode.parent.insertAfter(refNode, newRule);
        if (refNode.name.startsWith('sugar')) {
            refNode.remove();
        }
        refNode = newRule;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDaEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUs7UUFDNUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FB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