import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiCodeExampleClassesInterface extends __SInterface {
    static get _definition() {
        return {
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
    scope: ('bare' | 'lnf' | 'vr' | 'theme')[];
}

export { postcssUiCodeExampleClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.codeExample
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a code example
 *
 * @snippet      @s.ui.codeExample.classes($1);
 *
 * @example        css
 * \@s.ui.codeExample.classes;
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
    params: Partial<IPostcssUiCodeExampleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiCodeExampleClassesParams = {
        scope: ['bare', 'lnf', 'theme'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-code-example {
            @s.ui.codeExample($scope: bare);
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
            * @name           .s-code-example[lnf="default"]
            * @namespace          sugar.style.ui.codeExample
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> code example
            * 
            * @example        html
            * <s-code-example>
            *   <template language="js">
            *       console.log('hello world');
            *   </template>
            * </s-code-example>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `.s-code-example[lnf="default"]:not(.s-bare) {
                @s.ui.codeExample($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('theme')) {
        vars.code(
            `
            .s-code-example:not(.s-bare) {
                @s.highlightjs.theme;
            }
        `,
            {
                type: 'CssClass',
            },
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
            *       <template language="js">
            *           console.log('hello world');
            *       </template>
            *   </s-code-example>
            *   <s-code-example>
            *       <template language="js">
            *           console.log('hello world');
            *       </template>
            *   </s-code-example>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@s.rhythm.vertical {
                .s-code-example {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.codeExample.rhythmVertical'),
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
