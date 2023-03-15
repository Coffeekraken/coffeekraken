import __SInterface from '@coffeekraken/s-interface';

class postcssUiSpacesSelectorClassesInterface extends __SInterface {
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

export interface IPostcssUiSpacesSelectorClassesParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiSpacesSelectorClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.clipboardCopy
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a spaces selector (margin, padding)
 *
 * @snippet      @sugar.ui.spacesSelector.classes($1);
 *
 * @example        css
 * \@sugar.ui.spacesSelector.classes;
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
    params: Partial<IPostcssUiSpacesSelectorClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiSpacesSelectorClassesParams = {
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
            * @name           .s-spaces-selector[lnf="default"]
            * @namespace          sugar.style.ui.clipboardCopy
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> spaces selector
            * 
            * @example        html
            * <s-spaces-selector></s-spaces-selector>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `.s-spaces-selector[lnf="default"]:not(.s-bare) {
                @sugar.ui.spacesSelector($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
