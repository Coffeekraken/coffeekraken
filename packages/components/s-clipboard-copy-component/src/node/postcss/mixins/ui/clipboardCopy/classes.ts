import __SInterface from '@coffeekraken/s-interface';

class postcssUiClipboardCopyClassesInterface extends __SInterface {
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

export interface IPostcssUiClipboardCopyClassesParams {
    scope: ('bare' | 'lnf')[];
}

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
 * @snippet      @sugar.ui.clipboardCopy.classes($1);
 *
 * @example        css
 * \@sugar.ui.clipboardCopy.classes;
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
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    // if (finalParams.scope.includes('bare')) {
    //     vars.code(
    //         `
    // `,
    //         {
    //             type: 'CssClass',
    //         },
    //     );
    // }

    if (finalParams.scope.includes('lnf')) {
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
            `.s-clipboard-copy[lnf="default"]:not(.s-bare) {
                @sugar.ui.clipboardCopy($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
