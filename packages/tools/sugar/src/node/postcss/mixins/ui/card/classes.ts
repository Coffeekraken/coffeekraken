import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiCardClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.card.defaultLnf') ?? 'solid',
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.card.defaultColor'),
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

export interface IPostcssUiCardClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiCardClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiCardClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiCardClassesParams = {
        lnfs: ['solid'],
        defaultLnf: 'solid',
        defaultColor: 'main',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
                .s-card {
                    @sugar.ui.card($scope: bare);
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
            * @name           .s-card:not(.s-bare)
            * @namespace          sugar.ui.card
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> card
            * 
            * @example        html
            * <s-menu>
            *   <template lang="js">
            *       console.log('hello world');
            *   </template>
            * </s-menu>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-card:not(.s-bare) {
                @sugar.ui.card($scope: lnf, $lnf: ${finalParams.defaultLnf});
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            `
            .s-card:not(.s-bare) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    return vars;
}
