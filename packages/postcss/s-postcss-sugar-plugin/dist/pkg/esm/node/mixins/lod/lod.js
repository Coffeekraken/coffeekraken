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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7YUFDNUI7WUFDRCxtQkFBbUIsRUFBRTtnQkFDakIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU1iOztJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsQ0FBQyxFQUNSLE1BQU0sRUFBRSxNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxtQ0FBSSxPQUFPLElBQ25DLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRiw2Q0FBNkM7SUFDN0MsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUEsRUFBRTtRQUN4QixJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRTtZQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQzthQUFN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