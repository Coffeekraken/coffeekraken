import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          classes
 * @as              @s.ui.radio.classes
 * @namespace     node.mixin.ui.radio
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the radio classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default lnf you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.radio.classes
 *
 * @example     css
 * @s.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiRadioClassesInterface extends __SInterface {
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
                default: __STheme.get('ui.form.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'tf'],
                default: ['bare', 'lnf', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginUiRadioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Radio
        * @namespace          sugar.style.ui.radio
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display nice radio in your forms
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
        * @s.ui.radio.classes;
        * 
        * .my-radio {
        *   @s.ui.radio;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-radio${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} radio lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf
            *   <label class="s-mbe:30 s-label">
            *     <span>John Doe</span>
            *     <input type="radio" checked class="s-radio" name="radio-lnf-${lnf}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="radio" disabled class="s-radio" name="radio-lnf-${lnf}" value="hello 3" />
            *   </label>
            * `;
    })
        .join('\n')}
        *
        * @example        html          Shapes
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-shape:default" name="radio-style-color" value="hello 1" checked />
        * </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-shape:square" name="radio-style-color" value="hello 1" checked />
        * </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-shape:pill" name="radio-style-color" value="hello 1" checked />
        * </label>
        * 
        * @example        html          Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio" name="radio-style-color" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-color" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:complementary" name="radio-style-color" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>I'm disabled</span>
        *     <input type="radio" disabled class="s-radio s-color:error" name="radio-style-color" value="hello 4" />
        *   </label>
        * 
        * @example        html          RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-ltr" value="hello 1" checked />
        *   </label>
        * </div>
        * 
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-scale" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:20">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:30">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-radio
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem2" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-radio {
                @s.ui.radio($scope: bare);
            }
            `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            let cls = `s-radio`;
            if (lnf !== finalParams.defaultLnf) {
                cls += `--${lnf}`;
            }
            vars.comment(() => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${lnf}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls}:not(.s-bare) {
                @s.ui.radio($lnf: ${lnf}, $scope: lnf);
            }
            `, {
                type: 'CssClass',
            });
        });
    }
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text input[type="radio"]
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a simple input[type="radio"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="radio" name="my-radio" checked />
            *   <input type="radio" name="my-radio" />
            *   <input type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @s.format.text {
                input[type="radio"] {
                    @s.ui.radio($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent some input[type="radio"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-radio" type="radio" name="my-radio" checked />
            *   <input class="s-radio" type="radio" name="my-radio" />
            *   <input class="s-radio" type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @s.rhythm.vertical {
                input[type="radio"], .s-radio {
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.form.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDdkM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsVUFBVSxFQUFFLE9BQU8sRUFDbkIsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBMkJKLFdBQVcsQ0FBQyxJQUFJO1NBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDVCxPQUFPLDJCQUNILEdBQUcsS0FBSyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUNqRCx3QkFBd0IsR0FBRyxZQUFZLENBQUM7SUFDNUMsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7VUFFYixXQUFXLENBQUMsSUFBSTtTQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsT0FBTyxpQ0FBaUMsR0FBRzs7O2dGQUdxQixHQUFHOzs7O2lGQUlGLEdBQUc7O2VBRXJFLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0ErRGxCLENBQ0EsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O1FBZVYsQ0FDQyxDQUFDLElBQUksQ0FDRjs7OzthQUlDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDcEIsSUFBSSxHQUFHLEtBQUssV0FBVyxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsR0FBRyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDckI7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO2dDQUNVLEdBQUc7Ozs7NkRBSTBCLEdBQUc7OztrREFJaEQsR0FBRyxLQUFLLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQ2pEO2tEQUVJLEdBQUcsS0FBSyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUNqRDtnREFFSSxHQUFHLEtBQUssV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQ7Ozs7O1FBS0osQ0FDSyxDQUFDLElBQUksQ0FDRjtlQUNELEdBQUc7b0NBQ2tCLEdBQUc7O2FBRTFCLEVBQ0c7Z0JBQ0ksSUFBSSxFQUFFLFVBQVU7YUFDbkIsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQlYsQ0FDQyxDQUFDLElBQUksQ0FDRjs7OzJDQUcrQixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7OztTQUc3RCxFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQlYsQ0FDQyxDQUFDLElBQUksQ0FDRjs7O3NCQUdVLFFBQVEsQ0FBQyx1QkFBdUIsQ0FDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUN6Qzs7O1NBR1osRUFDRztZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9