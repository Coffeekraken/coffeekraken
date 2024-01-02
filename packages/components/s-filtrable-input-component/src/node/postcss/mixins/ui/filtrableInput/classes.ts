import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiFiltrableInputClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiFiltrableInputClassesParams {}

export { postcssUiFiltrableInputClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.filtrableInput
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a filtrable input
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet      @s.ui.filtrableInput.classes($1);
 *
 * @example        css
 * \@s.ui.filtrableInput.classes;
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
    params: Partial<IPostcssUiFiltrableInputClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiFiltrableInputClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(
        `
        .s-filtrable-input[lnf="default"] {
            @s.ui.filtrableInput;
        }
        `,
        {
            type: 'CssClass',
        },
    );

    vars.code(`@s.scope 'vr' {`);
    // @TODO            example
    vars.comment(
        `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent some filtrable inputs in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   example not available for now...
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `@s.rhythm.vertical {
                .s-filtrable-input {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get(
                            'ui.filtrableInput.rhythmVertical',
                        ),
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
