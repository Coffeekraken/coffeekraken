import __SInterface from '@coffeekraken/s-interface';
import { __fromQuantifier } from '@coffeekraken/sugar/array';

/**
 * @name           filter
 * @as              @s.lod.filter
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        alpha
 *
 * This mixin allows you to specify which lod you want to keep from the enclosed css.
 * This is useful for example if you want to start with some sugar classes but filter
 * certain levels.
 *
 * @param           {Number|String}         level           The level of details you want to keep. "2" will mean 0, 1 and 2. "=2" will mean filter the level 2. ">=2" will mean 2 and greater, etc...
 * @return        {Css}         The generated css
 *
 * @snippet         @s.lod.filter($1)
 * @s.lod.filter($1) {
 *      $2
 * }
 *
 * @example        css
 * @s.lod.filter(2) {
 *      @s.ui.button.classes;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginLodFilterMixinInterface extends __SInterface {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginLodFilterMixinInterface as interface };

export interface postcssSugarPluginLodFilterMixinParams {
    level: number | string;
}
export default function ({
    params,
    atRule,
    settings,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginLodFilterMixinParams>;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginLodFilterMixinParams>{
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
        selector: `.s-lod-filter-${levels.join('-')}`,
        nodes: atRule.nodes,
    });

    atRule.replaceWith(newRule);
}
