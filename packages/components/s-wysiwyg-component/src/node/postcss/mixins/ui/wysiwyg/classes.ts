import __SInterface from '@coffeekraken/s-interface';

class postcssUiWysiwygClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiWysiwygClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
}
export { postcssUiWysiwygClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.wysiwyg
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 * @private
 *
 * This mixin represent a wysiwyg editor
 *
 * @snippet      @s.ui.wysiwyg.classes($1);
 *
 * @example        css
 * \@s.ui.wysiwyg.classes;
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
    params: Partial<IPostcssUiWysiwygClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiWysiwygClassesParams = {
        lnfs: ['solid'],
        defaultLnf: 'solid',
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-wysiwyg {
            @s.scope.only 'bare' {
                @s.ui.wysiwyg;
            }
        }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    if (finalParams.lnfs.includes(finalParams.defaultLnf)) {
        vars.code(`@s.scope 'lnf' {`);
        vars.comment(
            `/**
            * @name          .s-wysiwyg[lnf="default"]
            * @namespace          sugar.style.ui.wysiwyg
            * @type           CssClass
            * 
            * This class represent the s-wysiwyg lnf component
            * 
            * @example        html
            * <s-wysiwyg></s-wysiwyg>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-wysiwyg[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.wysiwyg($lnf: ${finalParams.defaultLnf});
                }
            }
            `,
            {
                type: 'CssClass',
            },
        );
        vars.code('}');
    }

    return vars;
}
