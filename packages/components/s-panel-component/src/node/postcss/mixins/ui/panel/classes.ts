import __SInterface from '@coffeekraken/s-interface';

class postcssUiPanelClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiPanelClassesParams {}

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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
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
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);

    vars.code(
        `
        .s-panel {
            @s.scope.only 'bare' {
                @s.ui.panel;
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
            .s-panel[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.panel;
                }
            }
        `,
        {
            type: 'CssClass',
        },
    );
    vars.push('}');

    return vars;
}
