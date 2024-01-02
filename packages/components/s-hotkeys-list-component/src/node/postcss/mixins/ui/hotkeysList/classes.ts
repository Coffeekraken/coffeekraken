import __SInterface from '@coffeekraken/s-interface';

class postcssUiHotkeysListClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiHotkeysListClassesParams {}

export { postcssUiHotkeysListClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.hotkeysList
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent the hotkeys list
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.hotkeysList.classes($1);
 *
 * @example        css
 * \@s.ui.hotkeysList.classes;
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
    params: Partial<IPostcssUiHotkeysListClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiHotkeysListClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-hotkeys-list {
            @s.scope.only 'bare' {
                @s.ui.hotkeysList;
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
            * @name          .s-hotkeys-list[lnf="default"]
            * @namespace          sugar.style.ui.hotkeysList
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> hotkeys list
            * 
            * @example        html
            * <<s-hotkeys-list>></<s-hotkeys-list>>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `
            .s-hotkeys-list[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.hotkeysList;
                }
            }`,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    return vars;
}
