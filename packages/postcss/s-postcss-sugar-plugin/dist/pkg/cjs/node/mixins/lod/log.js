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
 * \@sugar.lod(4) {
 *      .myElement {
 *          background: red;
 *          width: 100%;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodMixinInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginLodMixinInterface;
function default_1({ params, atRule, postcssApi, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUMrQyx3REFBUztBQU16RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEdBS2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLENBQUMsRUFDUixNQUFNLEVBQUUsT0FBTyxJQUNaLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFFNUIsSUFBSSxPQUFPLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxPQUFPLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzlDLElBQUksVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUN6QjtLQUNKO0lBRUQsbUNBQW1DO0lBQ25DLDJCQUEyQjtJQUMzQiw0QkFBNEI7SUFDNUIsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixzQ0FBc0M7SUFDdEMsMkRBQTJEO0lBQzNELHVDQUF1QztJQUN2QywwRUFBMEU7SUFDMUUsb0hBQW9IO0lBQ3BILFFBQVE7SUFDUixNQUFNO0lBRU4sbURBQW1EO0lBQ25ELG1CQUFtQjtBQUN2QixDQUFDO0FBM0NELDRCQTJDQyJ9