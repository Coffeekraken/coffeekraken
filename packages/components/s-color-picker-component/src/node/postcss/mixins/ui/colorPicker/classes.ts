import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiColorPickerClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiColorPickerClassesParams {}

export { postcssUiColorPickerClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.colorPicker
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a color picker
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet      @s.ui.colorPicker.classes($1);
 *
 * @example        css
 * \@s.ui.colorPicker.classes;
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
    params: Partial<IPostcssUiColorPickerClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiColorPickerClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);

    vars.code(
        `
        .s-color-picker {
            @s.ui.colorPicker;
        }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
    vars.comment(
        `/**
            * @name           .s-color-picker[lnf="default"]
            * @namespace          sugar.style.ui.colorPicker
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> color picker
            * 
            * @example        html
            * <s-color-picker input button></s-color-picker>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `.s-color-picker[lnf="default"] {
                @s.ui.colorPicker;
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
            * @namespace          sugar.style.ui.colorPicker
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-color-picker inline button input></s-color-picker>
            *   <s-color-picker inline button input></s-color-picker>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `@s.rhythm.vertical {
                .s-color-picker[inline] {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.colorPicker.rhythmVertical'),
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
