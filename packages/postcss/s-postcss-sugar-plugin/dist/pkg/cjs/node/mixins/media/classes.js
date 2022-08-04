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
function default_1({ params, atRule, getCacheFilePath, getRoot, postcssApi, registerPostProcessor, nodesToString, replaceWith, }) {
    const finalParams = Object.assign({ query: '' }, params);
    const mediaConfig = s_theme_1.default.get('media');
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
                    params: s_theme_1.default
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDaEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTXdELGlFQUFTO0FBRWxFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUVyQyxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLFVBQVUsRUFDVixxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFdBQVcsR0FVZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUs7UUFDNUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU87U0FDVjtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsZ0NBQWdDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsOENBQThDO0lBRTlDLHVCQUF1QjtJQUN2QixnREFBZ0Q7SUFDaEQscUNBQXFDO0lBQ3JDLG9EQUFvRDtJQUNwRCxNQUFNO0lBRU4sSUFBSSxDQUFDLHdCQUF3QixFQUFFO1FBQzNCLHdCQUF3QixHQUFHLElBQUksQ0FBQztRQUVoQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNCLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNyRCxNQUFNLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7b0JBQ3BDLElBQUksRUFBRSxPQUFPO29CQUNiLE1BQU0sRUFBRSxpQkFBUTt5QkFDWCxlQUFlLENBQUMsS0FBSyxDQUFDO3lCQUN0QixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztpQkFDOUIsQ0FBQyxDQUFDO2dCQUNILGFBQWE7Z0JBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUzs0QkFBRSxPQUFPO3dCQUNwQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTzs0QkFBRSxPQUFPO3dCQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDaEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDMUI7NkJBQU07NEJBQ0gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7aUNBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUM7aUNBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQ0FDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FDdkIsb0JBQW9CLENBQ3ZCLENBQUM7Z0NBQ0YsSUFBSSxDQUFDLFNBQVM7b0NBQUUsT0FBTyxHQUFHLENBQUM7Z0NBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQ0FDM0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQ2IsUUFBUSxFQUNSLEdBQUcsUUFBUSxNQUFNLEtBQUssRUFBRSxDQUMzQixDQUFDO2dDQUNOLENBQUMsQ0FBQyxDQUFDO2dDQUNILE9BQU8sR0FBRyxDQUFDOzRCQUNmLENBQUMsQ0FBQyxDQUFDOzRCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDL0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDMUI7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ047QUFDTCxDQUFDO0FBakdELDRCQWlHQyJ9