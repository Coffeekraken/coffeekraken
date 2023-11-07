import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class SSugarcssPluginRhythmVerticalMixinInterface extends __SInterface {
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
export { SSugarcssPluginRhythmVerticalMixinInterface as interface };

export interface SSugarcssPluginRhythmVerticalMixinParams {
    themePath?: string;
}

/**
 * @name           vertical
 * @as              @s.rhythm.vertical
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
 * @snippet         @s.rhythm.vertical
 * @s.rhythm.vertical {
 *      $1
 * }
 *
 * @example        css          Custom styling
 * .my-cool-element {
 *    @s.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example         css         Theme dot path
 * .my-cool-element {
 *    @s.rhythm.vertical(ui.codeExample.rhythmVertical);
 * }
 *
 * @example       html
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
    params: Partial<SSugarcssPluginRhythmVerticalMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <SSugarcssPluginRhythmVerticalMixinParams>{
        ...(params ?? {}),
    };

    let generatedCss: string[] = [],
        themeGeneratedCss;

    if (params.themePath) {
        themeGeneratedCss = [
            __STheme.jsObjectToCssProperties(
                __STheme.get(params.themePath) ?? {},
            ),
        ];
    }

    if (atRule.parent && atRule.parent.selector && themeGeneratedCss) {
        const newCss = `
            .s-rhythm-vertical > ${atRule.parent.selector} {
                ${themeGeneratedCss}
            }
        `;
        generatedCss.push(newCss);
    }

    const declarations: string[] = [];

    // nested selectors
    if (atRule.nodes?.length) {
        atRule.nodes?.forEach((node) => {
            // selectors
            if (node.selector) {
                node.selector = node.selector
                    .split(',')
                    .map((sel) => {
                        return `.s-rhythm-vertical > ${sel}`;
                    })
                    .join(',');
            } else {
                // declarations
                declarations.push(node.toString?.() ?? '');
                node.remove();
            }
        });
    }

    if (declarations.length) {
        generatedCss.push(`.s-rhythm-vertical > ${atRule.parent.selector} {
                ${declarations.join('\n')}
            }`);
    }

    // generated css
    if (generatedCss.length) {
        for (let i = generatedCss.length - 1; i >= 0; i--) {
            atRule.parent.after(generatedCss[i]);
        }
    }

    if (atRule.nodes && atRule.nodes.length) {
        atRule.replaceWith(atRule.nodes);
    } else {
        atRule.remove();
    }
}
