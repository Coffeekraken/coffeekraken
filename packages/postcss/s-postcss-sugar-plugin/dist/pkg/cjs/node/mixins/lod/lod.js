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
function default_1({ params, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({ level: 0, method: 'class' }, (params !== null && params !== void 0 ? params : {}));
    const levels = [];
    let action = settings.lod.defaultAction;
    if (typeof finalParams.level === 'number') {
        levels.push(finalParams.level);
    }
    else if (typeof finalParams.level === 'string') {
        const actionMatch = finalParams.level.match(/^((>|<)?\=?)/);
        if (actionMatch[0]) {
            action = actionMatch[0];
        }
        let startLevel, endLevel, levelInt = parseInt(finalParams.level.replace(/^(>|<)?\=?/, ''));
        if (action === '>=') {
            startLevel = levelInt;
            endLevel = Object.keys(settings.lod.levels).length - 1;
        }
        else if (action === '<=') {
            startLevel = 0;
            endLevel = levelInt;
        }
        else if (action === '=') {
            startLevel = levelInt;
            endLevel = levelInt;
        }
        else if (action === '<') {
            startLevel = 0;
            endLevel = levelInt - 1;
        }
        else if (action === '>') {
            startLevel = levelInt + 1;
            endLevel = Object.keys(settings.lod.levels).length - 1;
        }
        // add the wanted level(s) in the stack
        for (let i = startLevel; i <= endLevel; i++) {
            levels.push(i);
        }
    }
    // create a new rule that will wrap
    // the lod scoped ones
    const newSelectors = [];
    levels.forEach((lod) => {
        newSelectors.push(`.s-lod--${lod} &`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUMrQyx3REFBUztBQU16RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU1iO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxDQUFDLEVBQ1IsTUFBTSxFQUFFLE9BQU8sSUFDWixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBRXhDLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQztTQUFNLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM5QyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ2pCLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFDdEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO2FBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDZixRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3ZCLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFDdEIsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUN2QjthQUFNLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUN2QixVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsUUFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDM0I7YUFBTSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDdkIsVUFBVSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDMUIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsdUNBQXVDO1FBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtLQUNKO0lBRUQsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDbkMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBeEVELDRCQXdFQyJ9