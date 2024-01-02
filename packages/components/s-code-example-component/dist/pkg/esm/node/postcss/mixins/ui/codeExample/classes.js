import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiCodeExampleClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
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
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`
            @s.scope 'bare' {
                .s-code-example {
                    @s.ui.codeExample;
                }
            }
    `, {
        type: 'CssClass',
    });
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(`/**
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
        */`).code(`.s-code-example[lnf="default"] {
                @s.ui.codeExample;
            }`, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'theme' {`);
    vars.code(`
            .s-code-example {
                @s.highlightjs.theme;
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'vr' {`);
    vars.comment(`/**
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
        */`).code(`@s.rhythm.vertical {
                .s-code-example {
                    ${__STheme.current.jsObjectToCssProperties(__STheme.current.get('ui.codeExample.rhythmVertical'))}
                } 
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7OztLQU1ILEVBQ0c7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRyxDQUNOLENBQUMsSUFBSSxDQUNGOztjQUVNLEVBQ047UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7U0FJQyxFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXVCRyxDQUNOLENBQUMsSUFBSSxDQUNGOztzQkFFYyxRQUFRLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUN0QyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUN4RDs7O1NBR1osRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=