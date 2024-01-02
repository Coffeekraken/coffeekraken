import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiSliderClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiSliderClassesParams {}

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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       behavior        Behavior css
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
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-slider {
            @s.scope.only 'bare' {
                @s.ui.slider;
            }
        }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code(`}`);

    vars.code(`@s.scope 'lnf' {`);
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
            .s-slider[lnf*="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.slider;
                }
            }
            `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'behavior' {`);
    vars.code(
        `
            .s-slider[behavior*="default"] {
                @s.scope.only 'behavior' {
                    @s.ui.slider;
                }
            }`,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'vr' {`);
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
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.slider.rhythmVertical'),
                    )}
                } 
            }
        `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    return vars;
}
