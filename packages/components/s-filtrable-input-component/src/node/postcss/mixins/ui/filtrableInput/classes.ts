import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiFiltrableInputClassesInterface extends __SInterface {
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

export interface IPostcssUiFiltrableInputClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiFiltrableInputClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiFiltrableInputClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiFiltrableInputClassesParams = {
        scope: ['bare', 'lnf', 'vr'],
        ...params,
    };

    const vars = new CssVars();

    vars.code(
        `
        [lnf="default"] > .s-filtrable-input {
            @sugar.ui.filtrableInput($scope: bare);
        }
        `,
        {
            type: 'CssClass',
        },
    );

    // @TODO            example
    vars.comment(
        `/**
            * @name           [lnf="default"] > .s-filtrable-input
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color>" filtrable input
            * 
            * @example        html
            * Example not available for now...
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `
                [lnf="default"]:not(.s-bare) > .s-filtrable-input {
                    @sugar.ui.filtrableInput($lnf: solid, $scope: lnf);
                }`,
        {
            type: 'CssClass',
        },
    );

    if (finalParams.scope.indexOf('vr') !== -1) {
        // @TODO            example
        vars.comment(
            `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent some filtrable inputs in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   example not available for now...
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-filtrable-input {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.filtrableInput.rhythmVertical'),
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
