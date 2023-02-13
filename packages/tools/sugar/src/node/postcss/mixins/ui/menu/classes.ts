import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiCodeExampleClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            types: {
                type: 'String[]',
                values: ['primary', 'mobile'],
                default: ['primary', 'mobile'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.menu.defaultLnf') ?? 'solid',
            },
            defaultType: {
                type: 'String',
                values: ['primary', 'mobile'],
                default: __STheme.get('ui.menu.defaultType') ?? 'primary',
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

export interface IPostcssUiCodeExampleClassesParams {
    lnfs: 'solid'[];
    types: ('primary' | 'mobile')[];
    defaultLnf: 'solid';
    defaultType: 'primary' | 'mobile';
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiCodeExampleClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiCodeExampleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiCodeExampleClassesParams = {
        lnfs: ['solid'],
        types: ['primary', 'mobile'],
        defaultLnf: 'solid',
        defaultType: 'primary',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
                .s-menu:not(.s-bare) {
                    @sugar.ui.menu($scope: bare, $type: ${finalParams.defaultType});
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
            * @name           .s-menu
            * @namespace          sugar.ui.menu
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> code example
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
            .s-menu:not(.s-bare) {
                @sugar.ui.menu($scope: lnf, $lnf: ${finalParams.defaultLnf}, $type: ${finalParams.defaultType});
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
