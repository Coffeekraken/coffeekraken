import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiDatetimePickerClassesInterface extends __SInterface {
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
                default:
                    __STheme.get('ui.datetimePicker.defaultStyle') ?? 'solid',
            },
            defaultColor: {
                type: 'String',
                default: __STheme.get('ui.datetimePicker.defaultColor'),
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

export interface IPostcssUiDatetimePickerInputClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiDatetimePickerClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiDatetimePickerInputClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiDatetimePickerInputClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        defaultColor: 'main',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-datetime-picker {
            @sugar.ui.datetimePicker($scope: bare);
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
            * @name           .s-datetime-picker[lnf="default"]
            * @namespace          sugar.style.ui.datetimePicker
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> datetime picker
            * 
            * @example        html
            * <s-datetime-picker input button></s-datetime-picker>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `.s-datetime-picker[lnf="default"] {
                @sugar.color(${finalParams.defaultColor});
                @sugar.ui.datetimePicker($style: ${finalParams.defaultStyle}, $scope: lnf);
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
            * @namespace          sugar.style.ui.datetimePicker
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-datetime-picker inline button input></s-datetime-picker>
            *   <s-datetime-picker inline button input></s-datetime-picker>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-datetime-picker[inline] {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.datetimePicker.rhythmVertical'),
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
