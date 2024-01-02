import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiThemeSwitcherClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiThemeSwitcherClassesParams {}

export { postcssUiThemeSwitcherClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.themeSwitcher
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
 * @snippet      @s.ui.themeSwitcher.classes($1);
 *
 * @example        css
 * \@s.ui.themeSwitcher.classes;
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
    params: Partial<IPostcssUiThemeSwitcherClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiThemeSwitcherClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-theme-switcher {
            @s.scope.only 'bare' {
                @s.ui.themeSwitcher;
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
            * @name          .s-theme-switcher[lnf="default"]
            * @namespace          sugar.style.ui.themeSwitcher
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> theme switcher
            * 
            * @example        html
            * <s-theme-switcher></s-theme-switcher>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `
            .s-theme-switcher[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.themeSwitcher;
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
            * @namespace          sugar.style.ui.themeSwitcher
            * @type           CssClass
            * 
            * This class represent a theme switcher in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-theme-switcher></s-theme-switcher>
            *   <br />
            *   <s-theme-switcher></s-theme-switcher>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `@s.rhythm.vertical {
                .s-theme-switcher {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.themeSwitcher.rhythmVertical'),
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
