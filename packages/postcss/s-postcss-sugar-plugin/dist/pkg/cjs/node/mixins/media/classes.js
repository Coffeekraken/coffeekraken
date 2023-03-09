"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
class postcssSugarPluginMediaClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            query: {
                type: 'String',
                default: Object.keys(s_theme_1.default.get('media.queries')).join(','),
            },
        };
    }
}
exports.interface = postcssSugarPluginMediaClassesMixinInterface;
function default_1({ params, atRule, getRoot, postcssApi, postcss, registerPostProcessor, nodesToString, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ query: '' }, params);
    const mediaConfig = s_theme_1.default.get('media');
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
        newRule.params = `viewport ${s_theme_1.default
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ0c7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2hFO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU13RCxpRUFBUztBQUVsRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLO1FBQzVCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMs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