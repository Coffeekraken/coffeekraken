import __SInterface from '@coffeekraken/s-interface';

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

class postcssSugarPluginLodOnlyMixinInterface extends __SInterface {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            }
        };
    }
}
export { postcssSugarPluginLodOnlyMixinInterface as interface };

export interface postcssSugarPluginLodOnlyMixinParams {
    level: number | string;
}
export default function ({
    params,
    atRule,
    settings,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginLodOnlyMixinParams>;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginLodOnlyMixinParams>{
        level: 0,
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
