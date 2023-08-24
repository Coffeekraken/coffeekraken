import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
import __faker from 'faker';
/**
 * @name          classes
 * @as          @sugar.ui.input.classes
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the input classes
 *
 * @param       {('solid'|'underline')[]}                           [lnfs=['solid','underline']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default lnf you want
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.input.classes
 *
 * @example     css
 * \@sugar.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['solid', 'underline'],
            },
            defaultLnf: {
                type: 'String',
                default: __STheme.get('ui.form.defaultLnf'),
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
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Input
        * @namespace          sugar.style.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
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
        * \\@sugar.ui.input.classes;
        * 
        * .my-input {
        *   \@sugar.ui.input;
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
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-width:40" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        <span>I'm disabled</span>
            *       <input type="text" disabled placeholder="Type something!" class="s-input\:${lnf} s-width:40" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive s-mbe:30">
            *       <span>Support RTL</span>
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${lnf} s-width:40" />
            *   </label>
            * 
            * `;
    })
        .join('\n')}
        *
        ${__keysFirst(finalParams.lnfs, ['default'])
        .map((lnf) => {
        return ` * @example        html       Shapes
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-shape:default s-width:40" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-shape:square s-width:40" />
            *  </label>
            * <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-shape:pill s-width:40" />
            *  </label>
            * `;
    })
        .join('\n')}
        *
        * @example        html       Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
        .map((color) => {
        return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-color:${color} s-width:40" />
            *   </label>
            * `;
    })
        .join('\n')}
        *
        * @example        html       Scales (non-exhaustive)
        ${['07', '10', '13', '16']
        .map((scale) => {
        return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-scale:${scale} s-width:40" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
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
            @sugar.ui.input($scope: bare);
        }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
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
                `${cls}:not(.s-bare) {`,
                ` @sugar.ui.input($lnf: ${lnf}, $scope: lnf);`,
                `}`,
            ].join('\n'), {
                type: 'CssClass',
            });
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7YUFDbEM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDakM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsVUFBVSxFQUFF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