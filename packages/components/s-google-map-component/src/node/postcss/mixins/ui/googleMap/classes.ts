import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiGoogleMapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiGoogleMapClassesParams {}

export { postcssUiGoogleMapClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.googleMap
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a google map
 *
 * @snippet      @s.ui.googleMap.classes($1);
 *
 * @example        css
 * \@s.ui.googleMap.classes;
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
    params: Partial<IPostcssUiGoogleMapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiGoogleMapClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);

    vars.code(
        `
        .s-google-map {
            @@s.scope.only 'bare' {
                @s.ui.googleMap;
            }
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
            * @name          .s-google-map[lnf="default"]
            * @namespace          sugar.style.ui.googleMap
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> google map
            * 
            * @example        html
            * <s-google-map></s-google-map>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `
            .s-google-map[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.googleMap;
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
            * @namespace          sugar.style.ui.googleMap
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-google-map></s-google-map>
            *   <br />
            *   <s-google-map></s-google-map>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `@s.rhythm.vertical {
            .s-google-map {
                ${__STheme.current.jsObjectToCssProperties(
                    __STheme.current.get('ui.googleMap.rhythmVertical'),
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
