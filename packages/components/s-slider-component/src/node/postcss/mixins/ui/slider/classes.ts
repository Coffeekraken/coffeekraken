import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiSliderClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'behavior'],
                default: ['bare', 'lnf', 'vr', 'behavior'],
            },
        };
    }
}

export interface IPostcssUiSliderClassesParams {
    scope: ('bare' | 'lnf' | 'behavior' | 'vr')[];
}

export { postcssUiSliderClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.slider
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a color picker
 *
 * @snippet      @s.ui.slider.classes($1);
 *
 * @example        css
 * \@s.ui.slider.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiSliderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiSliderClassesParams = {
        scope: ['bare', 'lnf', 'behavior'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-slider {
            @s.ui.slider($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            `/**
            * @name          .s-slider[lnf*="default"]
            * @namespace          sugar.style.ui.slider
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> slider
            * 
            * @example        html
            * <s-slider></s-slider>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-slider[lnf*="default"]:not(.s-bare) {
                @s.ui.slider($scope: lnf);
            }
            `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('behavior')) {
        vars.code(
            `
            .s-slider[behavior*="default"] {
                @s.ui.slider($scope: behavior);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.slider
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-slider></s-slider>
            *   <br />
            *   <s-slider></s-slider>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@s.rhythm.vertical {
                .s-slider {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.slider.rhythmVertical'),
                    )}
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
