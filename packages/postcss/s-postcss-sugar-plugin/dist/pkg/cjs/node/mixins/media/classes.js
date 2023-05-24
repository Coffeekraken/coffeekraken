"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_media_1 = __importDefault(require("@coffeekraken/s-media"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           classes
 * @as              @sugar.media.classes
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
            if (node.name === 'media' && node._sMedia) {
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
    const mediaInstance = new s_media_1.default();
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
        if (refNode.name.startsWith('sugar')) {
            refNode.remove();
        }
        refNode = newRule;
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDaEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTXdELGlFQUFTO0FBRWxFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxVQUFVLEVBQ1YsT0FBTyxFQUNQLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsV0FBVyxHQVVkOztJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUs7UUFDNUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDeEIsTUFBTSxD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