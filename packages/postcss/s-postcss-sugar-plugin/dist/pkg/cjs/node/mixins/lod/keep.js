"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const array_1 = require("@coffeekraken/sugar/array");
/**
 * @name           only
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        beta
 *
 * This mixin allows you to specify which lod you want to keep from the enclosed css.
 * This is useful for example if you want to start with some sugar classes but ONLY
 * certain levels.
 *
 * @param           {Number|String}         level           The level of details you want to keep. "2" will mean 0, 1 and 2. "=2" will mean only the level 2. ">=2" will mean 2 and greater, etc...
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.lod.only(2) {
 *      \@sugar.ui.button.classes;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodOnlyMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginLodOnlyMixinInterface;
function default_1({ params, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({ level: 0 }, (params !== null && params !== void 0 ? params : {}));
    const levels = (0, array_1.__fromQuantifier)(finalParams.level, {
        max: Object.keys(settings.lod.levels).length,
        action: settings.lod.defaultAction,
    });
    console.log('level', levels);
    return;
    // create a new rule that will wrap
    // the lod scoped ones
    const newSelectors = [];
    levels.forEach((lod) => {
        let cls = `.s-lod--${lod}`;
        if (finalParams.method === 'file') {
            cls += `.s-lod-method--${finalParams.method}`;
        }
        newSelectors.push(`${cls} &`);
    });
    const newRule = postcssApi.rule({
        selector: newSelectors.join(','),
    });
    atRule.nodes.forEach((node) => {
        newRule.append(node);
    });
    atRule.replaceWith(newRule);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxxREFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNtRCw0REFBUztBQUs3RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU1iO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxDQUFDLElBQ0wsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFhLElBQUEsd0JBQWdCLEVBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN6RCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU07UUFDNUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYTtLQUNyQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3QixPQUFPO0lBRVAsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ25CLElBQUksR0FBRyxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMvQixHQUFHLElBQUksa0JBQWtCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqRDtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDbkMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBOUNELDRCQThDQyJ9