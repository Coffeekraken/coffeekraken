import __SInterface from '@coffeekraken/s-interface';

class postcssUiWysiwygClassesInterface extends __SInterface {
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

export interface IPostcssUiWysiwygClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf')[];
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
 * @snippet      @sugar.ui.wysiwyg.classes($1);
 *
 * @example        css
 * \@sugar.ui.wysiwyg.classes;
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
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-wysiwyg {
            @sugar.ui.wysiwyg($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (
        finalParams.lnfs.includes(finalParams.defaultLnf) &&
        finalParams.scope.includes('lnf')
    ) {
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
            .s-wysiwyg[lnf="default"]:not(.s-bare) {
                @sugar.ui.wysiwyg($lnf: ${finalParams.defaultLnf}, $scope: lnf);
            }
            `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
