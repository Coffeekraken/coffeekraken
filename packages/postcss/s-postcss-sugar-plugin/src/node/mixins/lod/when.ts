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
 * \@sugar.lod.when(4) {
 *      .myElement {
 *          background: red;
 *          width: 100%;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginLodWhenMixinInterface extends __SInterface {
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
export { postcssSugarPluginLodWhenMixinInterface as interface };

export interface postcssSugarPluginLodWhendMixinParams {
    level: number | string;
    method: 'remove' | 'file' | 'class';
}
export default function ({
    params,
    atRule,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginLodWhendMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginLodWhendMixinParams>{
        level: 0,
        method: 'class',
        ...(params ?? {}),
    };

    const levels: number[] = [];

    if (typeof finalParams.level === 'number') {
        levels.push(finalParams.level);
    } else if (typeof finalParams.level === 'string') {
        let startLevel,
            endLevel,
            levelInt = parseInt(finalParams.level.replace(/^(><)\=?/, ''));
        if (finalParams.level.startsWith('>=')) {
            startLevel = levelInt;
        }
    }

    // atRule.nodes.forEach((node) => {
    //     // handle only rules
    //     if (!node.selector) {
    //         return;
    //     }
    //     // mark the rule with the level
    //     // that will be processed in the "lod" postprocessor
    //     // node._sLodWhen = finalParams;
    //     if (!node.selector.includes(`.s-lod-when--${finalParams.level}`)) {
    //         node.selector = `.s-lod-when--${finalParams.level}.s-lod-method--${finalParams.method} ${node.selector}`;
    //     }
    // });

    // atRule.parent.insertAfter(atRule, atRule.nodes);
    // atRule.remove();
}
