import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';

class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };

export interface postcssSugarPluginRhythmVerticalMixinParams {}

/**
 * @name           vertical
 * @namespace      node.mixins.rhythm
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context.
 * Your css will be scoped inside the "s-rhythm:vertical" class.
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element s-rhythm\:vertical">Hello world</h1>
 * <div class="s-rhythm\:vertical">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
    params,
    atRule,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginRhythmVerticalMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginRhythmVerticalMixinParams>{
        ...(params ?? {}),
    };
    // const container = new postcssApi.Rule({
    //     selectors: [`.s-rhythm--vertical`],
    // });

    atRule.nodes?.forEach((node) => {
        if (!node.selector) return;
        node.selector = node.selector
            .split(',')
            .map((sel) => {
                return `.s-rhythm--vertical > ${sel}`;
            })
            .join(',');
    });
    atRule.replaceWith(atRule.nodes);

    // atRule.nodes.forEach((n) => {
    //     container.append(n.clone());
    // });
    // atRule.replaceWith(container);
}
