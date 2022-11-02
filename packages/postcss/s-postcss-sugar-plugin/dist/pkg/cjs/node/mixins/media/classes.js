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
function default_1({ params, atRule, getRoot, postcssApi, postcss, registerPostProcessor, nodesToString, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDaEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTXdELGlFQUFTO0FBRWxFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUVyQyxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUs7UUFDNUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENB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