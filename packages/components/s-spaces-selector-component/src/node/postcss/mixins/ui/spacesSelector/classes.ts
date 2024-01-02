import __SInterface from '@coffeekraken/s-interface';

class postcssUiSpacesSelectorClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiSpacesSelectorClassesParams {}

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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.spacesSelector.classes($1);
 *
 * @example        css
 * \@s.ui.spacesSelector.classes;
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
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'lnf' {`);
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
        `.s-spaces-selector[lnf="default"] {
            @s.scope.only 'lnf' {
                @s.ui.spacesSelector;
            }
        }`,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    return vars;
}
