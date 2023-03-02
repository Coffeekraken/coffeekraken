import __SInterface from '@coffeekraken/s-interface';
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
 * @snippet         @sugar.lod($1)
 * \@sugar.lod($1) {
 *      $2
 * }
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
class postcssSugarPluginLodMixinInterface extends __SInterface {
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
export { postcssSugarPluginLodMixinInterface as interface };
export default function ({ params, atRule, settings, postcssApi, }) {
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
                throw new Error(`<red>[postcssSugarPlugin.lod]</red> When using the "<yellow>@sugar.lod</yellow>" mixin at root level, children MUST be css rule and not a property or anything else...`);
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
        let cls = `.s-lod--${lod}`;
        newSelectors.push(`${cls}`);
    });
    // handle "less than" action
    if (action === '<') {
        newSelectors = newSelectors.map((s) => {
            for (let i = levelInt; i < Object.keys(levelsObj).length; i++) {
                s += `:not(.s-lod--${i})`;
            }
            s += ' ';
            return s;
        });
    }
    else if (action === '<=') {
        newSelectors = newSelectors.map((s) => {
            for (let i = levelInt + 1; i < Object.keys(levelsObj).length; i++) {
                s += `:not(.s-lod--${i})`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzthQUM1QjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFPNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixVQUFVLEdBTWI7O0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxDQUFDLEVBQ1IsTUFBTSxFQUFFLE1BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLG1DQUFJLE9BQU8sSUFDbkMsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLHlDQUF5QztJQUN6QyxJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDdkMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMv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