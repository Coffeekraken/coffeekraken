import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
/**
 * @name          classes
 * @as          @s.ui.input.classes
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the input classes
 *
 * @param       {('solid'|'underline')[]}                           [lnfs=['solid','underline']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default lnf you want
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet         @s.ui.input.classes
 *
 * @example     css
 * @s.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['solid', 'underline'],
            },
            defaultLnf: {
                type: 'String',
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}
export { SSugarcssPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid' }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Input
        * @namespace          sugar.style.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some lnfs to your text input
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.input.classes;
        * 
        * .my-input {
        *   @s.ui.input;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-input${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}           Apply the ${lnf} input lnf`;
    })
        .join('\n')}
        * 
        ${__keysFirst(finalParams.lnfs, ['default'])
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>John Doe</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf}" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        <span>I'm disabled</span>
            *       <input type="text" disabled placeholder="Type something!" class="s-input\:${lnf}" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive s-mbe:30">
            *       <span>Support RTL</span>
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${lnf}" />
            *   </label>
            * 
            * `;
    })
        .join('\n')}
        *
        * @example        html       Shapes
        *   <label class="s-label:responsive s-mbe:30">
        *       <span>John Doe</span>
        *       <input type="text" placeholder="Type something!" class="s-input s-shape:default" />
        *  </label>
        *   <label class="s-label:responsive s-mbe:30">
        *       <span>John Doe</span>
        *       <input type="text" placeholder="Type something!" class="s-input s-shape:square" />
        *  </label>
        * <label class="s-label:responsive s-mbe:30">
        *       <span>John Doe</span>
        *       <input type="text" placeholder="Type something!" class="s-input s-shape:pill" />
        *  </label>
        * 
        *
        * @example        html       Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
        .map((color) => {
        return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>John Doe</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-color:${color}" />
            *   </label>
            * `;
    })
        .join('\n')}
        *
        * @example        html       Scales (non-exhaustive)
        ${['07', '10', '13', '16']
        .map((scale) => {
        return ` 
            *   <label class="s-label:responsive s-scale:${scale} s-mbe:30">
            *       <span>John Doe</span>
            *       <input type="text" placeholder="Type something!" class="s-input" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
        * @name           s-input
        * @namespace          sugar.style.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-input {
            @s.scope.only 'bare' {
                @s.ui.input;
            }
        }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    finalParams.lnfs.forEach((lnf) => {
        const isDefaultStyle = finalParams.defaultLnf === lnf;
        const styleCls = isDefaultStyle ? '' : `.s-input-${lnf}`;
        const cls = `.s-input${styleCls}`;
        vars.comment(() => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${lnf}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code([
            `${cls} {`,
            `   @s.scope.only 'lnf' {`,
            `       @s.ui.input($lnf: ${lnf});`,
            `   }`,
            `}`,
        ].join('\n'), {
            type: 'CssClass',
        });
    });
    vars.code('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQzthQUNsQztZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsVUFBVSxFQUFFLE9BQU8sSUFDaEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQTJCSixXQUFXLENBQUMsSUFBSTtTQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsT0FBTywyQkFDSCxXQUFXLENBQUMsVUFBVSxLQUFLLEdB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