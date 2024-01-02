import __SInterface from '@coffeekraken/s-interface';

class postcssUiClipboardCopyClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiClipboardCopyClassesParams {}

export { postcssUiClipboardCopyClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.clipboardCopy
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a clipboard copy
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.clipboardCopy.classes($1);
 *
 * @example        css
 * \@s.ui.clipboardCopy.classes;
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
    params: Partial<IPostcssUiClipboardCopyClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiClipboardCopyClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'lnf' {`);
    vars.comment(
        `/**
            * @name           .s-clipboard-copy[lnf="default"]
            * @namespace          sugar.style.ui.clipboardCopy
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> clipboard copy
            * 
            * @example        html
            * <s-clipboard-copy onclick="this.copy('hello world')"></s-clipboard-copy>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `.s-clipboard-copy[lnf="default"] {
                @s.ui.clipboardCopy;
            }`,
        {
            type: 'CssClass',
        },
    );

    vars.code('}');

    return vars;
}
