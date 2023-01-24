import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiGoogleMapClassesInterface extends __SInterface {
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

export interface IPostcssUiGoogleMapClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiGoogleMapClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiGoogleMapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiGoogleMapClassesParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-google-map {
            @sugar.ui.googleMap($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            `/**
            * @name          .s-google-map[lnf="default"]
            * @namespace          sugar.style.ui.googleMap
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> google map
            * 
            * @example        html
            * <s-google-map></s-google-map>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-google-map[lnf="default"]:not(.s-bare) {
                @sugar.ui.googleMap($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    // // default color
    // if (finalParams.scope.includes('lnf')) {
    //     vars.code(
    //         () => `
    //         .s-google-map:not(.s-color) {
    //             @sugar.color(${finalParams.defaultColor});
    //         }
    //     `,
    //         { type: 'CssClass' },
    //     );
    // }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.googleMap
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-google-map></s-google-map>
            *   <br />
            *   <s-google-map></s-google-map>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-google-map {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.googleMap.rhythmVertical'),
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
