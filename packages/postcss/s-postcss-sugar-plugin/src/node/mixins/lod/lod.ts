import __SInterface from '@coffeekraken/s-interface';

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

export interface postcssSugarPluginLodMixinParams {
    level: number | string;
    method: 'file' | 'class';
    keepWhenLodDisabled: boolean;
}
export default function ({
    params,
    atRule,
    settings,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginLodMixinParams>;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginLodMixinParams>{
        level: 0,
        method: settings.lod.method ?? 'class',
        ...(params ?? {}),
    };

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
        throw new Error(
            `<red>[lod]</red> Sorry but the passed "${
                finalParams.level
            }" level does not exists. Here's the available ones:\n- ${Object.keys(
                settings.lod.levels,
            )
                .map((l) => {
                    return `${l}:${settings.lod.levels[l].name}`;
                })
                .join('\n- ')}`,
        );
    }

    // check if the lod feature is enabled or not
    if (!settings.lod?.enabled) {
        if (finalParams.keepWhenLodDisabled) {
            atRule.replaceWith(atRule.nodes);
        } else {
            atRule.remove();
        }
        return;
    }

    // handle mixin at root
    if (atRule.parent.type === 'root') {
        atRule.nodes.forEach((node) => {
            if (!node.selector) {
                throw new Error(
                    `<red>[postcssSugarPlugin.lod]</red> When using the "<yellow>@s.lod</yellow>" mixin at root level, children MUST be css rule and not a property or anything else...`,
                );
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

    const levels: number[] = [];
    let action = settings.lod.defaultAction,
        levelsObj = settings.lod.levels;

    const levelInt = parseInt(
        `${finalParams.level}`.replace(/^[\<\>\=]{1,2}/gm, ''),
    );

    if (typeof finalParams.level === 'number') {
        levels.push(finalParams.level);
    } else if (typeof finalParams.level === 'string') {
        const actionMatch = finalParams.level.match(/^((>|<)?\=?)/);
        if (actionMatch[0]) {
            action = actionMatch[0];
        }

        let startLevel,
            endLevel,
            levelInt = parseInt(finalParams.level.replace(/^(>|<)?\=?/, ''));
        if (action === '>=') {
            startLevel = levelInt;
            endLevel = Object.keys(settings.lod.levels).length - 1;
        } else if (action === '<=') {
            startLevel = 0;
            endLevel = levelInt;
        } else if (action === '=') {
            startLevel = levelInt;
            endLevel = levelInt;
        } else if (action === '<') {
            startLevel = 0;
            endLevel = levelInt - 1;
        } else if (action === '>') {
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
    let newSelectors: string[] = [];

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
    } else if (action === '<=') {
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
