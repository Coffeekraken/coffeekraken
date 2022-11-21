import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiThemeSwitcherClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}

export interface IPostcssUiThemeSwitcherClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiThemeSwitcherClassesInterface as interface };

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
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-theme-switcher {
            @sugar.ui.themeSwitcher($scope: bare);
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
                @sugar.ui.themeSwitcher($scope: lnf);
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
            `@sugar.rhythm.vertical {
                .s-theme-switcher {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.themeSwitcher.rhythmVertical'),
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
