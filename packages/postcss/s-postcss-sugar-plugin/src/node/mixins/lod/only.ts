import __SInterface from '@coffeekraken/s-interface';
import { __fromQuantifier } from '@coffeekraken/sugar/array';

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
            },
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

    // check if the lod feature is enabled or not
    if (!settings.lod?.enabled) {
        atRule.replaceWith(atRule.nodes);
        return;
    }

    const levels: number[] = __fromQuantifier(finalParams.level, {
        max: Object.keys(settings.lod.levels).length - 1,
        action: '<=',
    });

    const newRule = postcssApi.rule({
        selector: `.s-lod-only--${levels.join('-')}`,
        nodes: atRule.nodes,
    });

    atRule.replaceWith(newRule);
}
