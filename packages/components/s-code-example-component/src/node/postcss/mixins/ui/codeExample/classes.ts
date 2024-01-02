import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiCodeExampleClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiCodeExampleClassesParams {}

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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 * @scope       theme           The highlightjs theme css
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
        ...params,
    };

    const vars = new CssVars();

    vars.code(
        `
            @s.scope 'bare' {
                .s-code-example {
                    @s.ui.codeExample;
                }
            }
    `,
        {
            type: 'CssClass',
        },
    );

    vars.code(`@s.scope 'lnf' {`);
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
        `.s-code-example[lnf="default"] {
                @s.ui.codeExample;
            }`,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'theme' {`);
    vars.code(
        `
            .s-code-example {
                @s.highlightjs.theme;
            }
        `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'vr' {`);
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
    vars.code('}');

    return vars;
}
