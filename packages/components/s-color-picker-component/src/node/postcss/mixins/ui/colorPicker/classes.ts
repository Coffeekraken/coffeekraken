import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiColorPickerClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.colorPicker.defaultStyle') ?? 'solid',
            },
            defaultColor: {
                type: 'String',
                default: __STheme.get('ui.colorPicker.defaultColor'),
            },
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

export interface IPostcssUiColorPickerClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiColorPickerClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiColorPickerClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiColorPickerClassesParams = {
        defaultColor: 'main',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-color-picker {
            @sugar.ui.colorPicker($scope: bare);
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
            * @name           .s-color-picker[lnf="default"]
            * @namespace          sugar.style.ui.colorPicker
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> color picker
            * 
            * @example        html
            * <s-color-picker input button></s-color-picker>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `.s-color-picker[lnf="default"] {
                @sugar.color(${finalParams.defaultColor});
                @sugar.ui.colorPicker($style: ${finalParams.defaultStyle}, $scope: lnf);
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
            * @namespace          sugar.style.ui.colorPicker
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-color-picker inline button input></s-color-picker>
            *   <s-color-picker inline button input></s-color-picker>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-color-picker[inline] {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.colorPicker.rhythmVertical'),
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
