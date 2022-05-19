import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
import __STheme from '@coffeekraken/s-theme';
import __postcss from 'postcss';

class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
    static get _definition() {
        return {
            themePath: {
                description:
                    'Specify a dot theme path where to get an object to apply for the vertical rhythm',
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };

export interface postcssSugarPluginRhythmVerticalMixinParams {
    themePath?: string;
}

/**
 * @name           vertical
 * @namespace      node.mixin.rhythm
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context.
 * Your css will be scoped inside the "s-rhythm:vertical" class.
 *
 * @return      {Css}         The generated css
 *
 * @example        css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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

    let generatedCss;

    if (params.themePath) {
        generatedCss = __STheme.jsObjectToCssProperties(
            __STheme.get(params.themePath) ?? {},
        );
    }

    if (atRule.nodes?.length) {
        atRule.nodes?.forEach((node) => {
            if (!node.selector) return;
            node.selector = node.selector
                .split(',')
                .map((sel) => {
                    return `.s-rhythm--vertical > ${sel}`;
                })
                .join(',');
        });
    }

    // append the generated css from the theme dot path object
    if (generatedCss) {
        atRule.append(generatedCss);
    }

    atRule.replaceWith(atRule.nodes);
}
