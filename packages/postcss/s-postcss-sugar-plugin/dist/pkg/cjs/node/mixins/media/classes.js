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
    sortedMedias.forEach((media) => {
        const newRule = refNode.clone();
        newRule.name = 'media';
        newRule.params = `${s_theme_1.default
            .buildMediaQuery(media, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ0c7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2hFO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU13RCxpRUFBUztBQUVsRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLO1FBQzVCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxXQUFXLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNqRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscUJBQXFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRztvQkFDVCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFOzRCQUNiLE9BQU8sQ0FBQyxDQUFDO3lCQUNaO3dCQUNELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3RELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLFNBQVM7Z0NBQUUsT0FBTyxHQUFHLENBQUM7NEJBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQ0FDM0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQ2IsUUFBUSxFQUNSLEdBQUcsUUFBUSxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FDbEMsQ0FBQzs0QkFDTixDQUFDLENBQUMsQ0FBQzs0QkFDSCxPQUFPLEdBQUcsQ0FBQzt3QkFDZixDQUFDLENBQUMsQ0FBQzt3QkFDSCxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVCLE9BQU8sQ0FBQyxDQUFDO29CQUNiLENBQUMsQ0FBQztpQkFDTCxDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRTFCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMzQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDdkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLGlCQUFRO2FBQ3ZCLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsTUFBTSxFQUFFLE9BQU87U0FDbEIsQ0FBQzthQUNELE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7UUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5GRCw0QkFtRkMifQ==