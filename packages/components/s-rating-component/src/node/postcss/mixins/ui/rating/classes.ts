import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiRatingClassesInterface extends __SInterface {
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
                default: __STheme.get('ui.rating.defaultStyle') ?? 'solid',
            },
            defaultColor: {
                type: 'String',
                default: __STheme.get('ui.rating.defaultColor'),
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

export interface IPostcssUiRatingClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiRatingClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiRatingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiRatingClassesParams = {
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
        .s-rating {
            @sugar.ui.rating($scope: bare);
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
            * @name          .s-rating[lnf="default"]
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> rating
            * 
            * @example        html
            * <s-rating></s-rating>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-rating[lnf="default"] {
                @sugar.ui.rating($style: ${finalParams.defaultStyle}, $scope: lnf);
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
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-rating></s-rating>
            *   <br />
            *   <s-rating></s-rating>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-rating {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.rating.rhythmVertical'),
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
