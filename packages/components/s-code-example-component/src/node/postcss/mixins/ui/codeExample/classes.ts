import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiCodeExampleClassesInterface extends __SInterface {
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
                default: __STheme.get('ui.codeExample.defaultStyle') ?? 'solid',
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.codeExample.defaultColor'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'theme'],
                default: ['bare', 'lnf', 'vr', 'theme'],
            },
        };
    }
}

export interface IPostcssUiCodeExampleClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr' | 'theme')[];
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
        styles: ['solid'],
        defaultStyle: 'solid',
        defaultColor: 'main',
        scope: ['bare', 'lnf', 'theme'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-code-example {
            @sugar.ui.codeExample($scope: bare);
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
            * @name           .s-code-example[lnf="default"]
            * @namespace          sugar.style.ui.codeExample
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> code example
            * 
            * @example        html
            * <s-code-example>
            *   <template lang="js">
            *       console.log('hello world');
            *   </template>
            * </s-code-example>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `.s-code-example[lnf="default"] {
                @sugar.ui.codeExample($style: ${finalParams.defaultStyle}, $scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('theme')) {
        vars.code(
            `
            .s-code-example {
                @sugar.highlightjs.theme;
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            () => `
            .s-code-example:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.codeExample
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-code-example>
            *       <template lang="js">
            *           console.log('hello world');
            *       </template>
            *   </s-code-example>
            *   <s-code-example>
            *       <template lang="js">
            *           console.log('hello world');
            *       </template>
            *   </s-code-example>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@sugar.rhythm.vertical {
                .s-code-example {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.codeExample.rhythmVertical'),
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
