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
const _mediasObj = {};
let _postProcessorRegistered = false;
function default_1({ params, atRule, getCacheFilePath, getRoot, postcssApi, postcss, registerPostProcessor, nodesToString, replaceWith, }) {
    const finalParams = Object.assign({ query: '' }, params);
    const mediaConfig = s_theme_1.default.get('media');
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
                        params: s_theme_1.default
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDaEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTXdELGlFQUFTO0FBRWxFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUVyQyxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLEVBQ1AscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixXQUFXLEdBV2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLO1FBQzVCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFX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