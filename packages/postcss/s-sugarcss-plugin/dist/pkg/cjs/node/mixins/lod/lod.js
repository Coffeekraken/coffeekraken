"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           lod
 * @as          @s.lod
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        alpha
 *
 * This mixin allows you to set certain part of your css in a lod (level of details) specific level.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.lod($1)
 * @s.lod($1) {
 *      $2
 * }
 *
 * @example        css
 * @s.lod(4) {
 *      .myElement {
 *          background: red;
 *          width: 100%;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginLodMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
            method: {
                type: 'String',
                values: ['file', 'class'],
            },
            keepWhenLodDisabled: {
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginLodMixinInterface;
function default_1({ params, atRule, settings, postcssApi, }) {
    var _a, _b;
    const finalParams = Object.assign({ level: 0, method: (_a = settings.lod.method) !== null && _a !== void 0 ? _a : 'class' }, (params !== null && params !== void 0 ? params : {}));
    // link text level to actual level number
    if (typeof finalParams.level === 'string') {
        for (let [level, levelObj] of Object.entries(settings.lod.levels)) {
            if (finalParams.level === levelObj.name) {
                finalParams.level = parseInt(level);
                break;
            }
        }
    }
    // make sure we have a valid number level
    if (typeof finalParams.level !== 'number') {
        throw new Error(`<red>[lod]</red> Sorry but the passed "${finalParams.level}" level does not exists. Here's the available ones:\n- ${Object.keys(settings.lod.levels)
            .map((l) => {
            return `${l}:${settings.lod.levels[l].name}`;
        })
            .join('\n- ')}`);
    }
    // check if the lod feature is enabled or not
    if (!((_b = settings.lod) === null || _b === void 0 ? void 0 : _b.enabled)) {
        if (finalParams.keepWhenLodDisabled) {
            atRule.replaceWith(atRule.nodes);
        }
        else {
            atRule.remove();
        }
        return;
    }
    // handle mixin at root
    if (atRule.parent.type === 'root') {
        atRule.nodes.forEach((node) => {
            if (!node.selector) {
                throw new Error(`<red>[SSugarcssPlugin.lod]</red> When using the "<yellow>@s.lod</yellow>" mixin at root level, children MUST be css rule and not a property or anything else...`);
            }
        });
    }
    // atRule.nodes.forEach(node => {
    //     if (node.selector && node.selector.match(/\&/)) {
    //         node.selector = node.selector.replace(/\&/gm, node.parent.selec)
    //     }
    // })
    // handle direct child declarations
    atRule.nodes.forEach((node) => {
        if (!node.selector) {
            if (!atRule._parentRule) {
                atRule._parentRule = postcssApi.rule({
                    selector: '&',
                });
                atRule.append(atRule._parentRule);
            }
            atRule._parentRule.append(node);
        }
    });
    const levels = [];
    let action = settings.lod.defaultAction, levelsObj = settings.lod.levels;
    const levelInt = parseInt(`${finalParams.level}`.replace(/^[\<\>\=]{1,2}/gm, ''));
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
    let newSelectors = [];
    levels.forEach((lod) => {
        let cls = `.s-lod-${lod}`;
        newSelectors.push(`${cls}`);
    });
    // handle "less than" action
    if (action === '<') {
        newSelectors = newSelectors.map((s) => {
            for (let i = levelInt; i < Object.keys(levelsObj).length; i++) {
                s += `:not(.s-lod-${i})`;
            }
            s += ' ';
            return s;
        });
    }
    else if (action === '<=') {
        newSelectors = newSelectors.map((s) => {
            for (let i = levelInt + 1; i < Object.keys(levelsObj).length; i++) {
                s += `:not(.s-lod-${i})`;
            }
            s += ' ';
            return s;
        });
    }
    const newRule = postcssApi.rule({
        selector: newSelectors.join(','),
    });
    atRule.nodes.forEach((node) => {
        newRule.append(node);
    });
    atRule.replaceWith(newRule);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzthQUM1QjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDNEMscURBQVM7QUFPdEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsR0FNYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLENBQUMsRUFDUixNQUFNLEVBQUUsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sbUNBQUksT0FBTyxJQUNuQyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYseUNBQXlDO0lBQ3pDLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN2QyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9ELElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNyQyxX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