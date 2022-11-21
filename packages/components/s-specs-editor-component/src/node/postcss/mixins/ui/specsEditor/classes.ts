import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiSpecsEditorClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'behavior'],
                default: ['bare', 'lnf', 'vr', 'behavior'],
            },
        };
    }
}

export interface IPostcssUiSpecsEditorClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'behavior' | 'vr')[];
}

export { postcssUiSpecsEditorClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiSpecsEditorClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiSpecsEditorClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        defaultColor: 'main',
        scope: ['bare', 'lnf', 'behavior'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-specs-editor {
            @sugar.ui.specsEditor($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (
        finalParams.styles.includes(finalParams.defaultStyle) &&
        finalParams.scope.includes('lnf')
    ) {
        vars.comment(
            `/**
            * @name          .s-specs-editor[lnf="default"]
            * @namespace          sugar.style.ui.specsEditor
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> slider
            * 
            * @example        html
            * <s-slider></s-slider>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-specs-editor[lnf="default"] {
                @sugar.ui.specsEditor($style: ${finalParams.defaultStyle}, $scope: lnf);
            }
            `,
            {
                type: 'CssClass',
            },
        );
    }

    if (
        finalParams.styles.includes(finalParams.defaultStyle) &&
        finalParams.scope.includes('behavior')
    ) {
        vars.code(
            `
            .s-specs-editor[behavior="default"] {
                @sugar.ui.specsEditor($style: ${finalParams.defaultStyle}, $scope: behavior);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.specsEditor
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-slider></s-slider>
            *   <br />
            *   <s-slider></s-slider>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-specs-editor {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.specsEditor.rhythmVertical'),
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
