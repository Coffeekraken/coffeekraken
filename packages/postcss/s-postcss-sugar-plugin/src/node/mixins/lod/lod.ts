import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

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
                default: __STheme.get('lod.defaultMethod'),
            },
        };
    }
}
export { postcssSugarPluginLodMixinInterface as interface };

export interface postcssSugarPluginLodMixinParams {
    level: number | string;
    method: 'file' | 'class';
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
        method: 'file',
        ...(params ?? {}),
    };

    const levels: number[] = [];

    let action = settings.lod.defaultAction;

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
    const newSelectors: string[] = [];

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
