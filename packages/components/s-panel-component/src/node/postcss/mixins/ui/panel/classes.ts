import __SInterface from '@coffeekraken/s-interface';

class postcssUiPanelClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssUiPanelClassesParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiPanelClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.panel
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a panel
 *
 * @snippet      @s.ui.panel.classes($1);
 *
 * @example        css
 * \@s.ui.panel.classes;
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
    params: Partial<IPostcssUiPanelClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiPanelClassesParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-panel {
            @s.ui.panel($scope: bare);
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
            * @name          .s-panel[lnf="default"]
            * @namespace          sugar.style.ui.panel
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> panel
            * 
            * @example        html
            * <s-panel>
            *   <template>
            *       <h1>Hello world</h1>
            *   </template>
            * </s-panel>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-panel[lnf="default"]:not(.s-bare) {
                @s.ui.panel($scope: lnf);
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
