"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           lod
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        beta
 *
 * This mixin allows you to set certain part of your css in a lod (level of details) specific level.
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.lod.when(4) {
 *      .myElement {
 *          background: red;
 *          width: 100%;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodWhenMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
            method: {
                type: 'String',
                values: ['remove', 'file', 'class'],
                default: 'class',
            },
        };
    }
}
exports.interface = postcssSugarPluginLodWhenMixinInterface;
function default_1({ params, atRule, settings, postcssApi, }) {
    var _a;
    // check if the lod feature is enabled or not
    if (!((_a = settings.lod) === null || _a === void 0 ? void 0 : _a.enabled)) {
        return;
    }
    const finalParams = Object.assign({ level: 0, method: 'class' }, (params !== null && params !== void 0 ? params : {}));
    const levels = [];
    if (typeof finalParams.level === 'number') {
        levels.push(finalParams.level);
    }
    else if (typeof finalParams.level === 'string') {
        let startLevel, endLevel, levelInt = parseInt(finalParams.level.replace(/^(><)\=?/, ''));
        if (finalParams.level.startsWith('>=')) {
            startLevel = levelInt;
        }
    }
    // atRule.nodes.forEach((node) => {
    //     // handle only rules
    //     if (!node.selector) {
    //         return;
    //     }
    //     // mark the rule with the level
    //     // that will be processed in the "lod" postprocessor
    //     // node._sLodWhen = finalParams;
    //     if (!node.selector.includes(`.s-lod-when--${finalParams.level}`)) {
    //         node.selector = `.s-lod-when--${finalParams.level}.s-lod-method--${finalParams.method} ${node.selector}`;
    //     }
    // });
    // atRule.parent.insertAfter(atRule, atRule.nodes);
    // atRule.remove();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNtRCw0REFBUztBQU03RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU1iOztJQUVHLDZDQUE2QztJQUM3QyxJQUFJLENBQUMsQ0FBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLE9BQU8sQ0FBQSxFQUFFO1FBQ3hCLE9BQU87S0FDVjtJQUVELE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsQ0FBQyxFQUNSLE1BQU0sRUFBRSxPQUFPLElBQ1osQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUU1QixJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7U0FBTSxJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDOUMsSUFBSSxVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQ3pCO0tBQ0o7SUFFRCxtQ0FBbUM7SUFDbkMsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1QixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLHNDQUFzQztJQUN0QywyREFBMkQ7SUFDM0QsdUNBQXVDO0lBQ3ZDLDBFQUEwRTtJQUMxRSxvSEFBb0g7SUFDcEgsUUFBUTtJQUNSLE1BQU07SUFFTixtREFBbUQ7SUFDbkQsbUJBQW1CO0FBQ3ZCLENBQUM7QUFuREQsNEJBbURDIn0=