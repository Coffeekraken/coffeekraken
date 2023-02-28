import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name          classes
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the input container classes
 *
 * @param       {('group'|'addon')[]}                           [lnfs=['group','addon']]         The style(s) you want to generate
 * @param       {'group'|'addon'}                [defaultLnf='group']           The default style you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.inputContainer.classes
 *
 * @example     css
 * \@sugar.ui.inputContainer.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['group', 'addon'],
            },
            defaultLnf: {
                type: 'String',
                default: 'group',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['group', 'addon'], defaultLnf: 'group', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Input container
        * @namespace          sugar.style.ui.inputContainer
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/input-container
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some lnfs to input container
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.inputContainer.classes;
        * 
        * .my-inputContainer {
        *   \@sugar.ui.inputContainer;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-input-container${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}           Apply the ${lnf} input container lnf`;
    })
        .join('\n')}
        * 
        * @example    html          Group
        * <label class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:group s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <button class="s-btn s-color:accent">Search!</button>
        *      </div>
        * </label>
        * 
        * @example    html          Group (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:group s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <button class="s-btn s-color:accent">Search!</button>
        *      </div>
        * </label>
        * 
        * @example    html          Addon
        * <label class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:addon s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <div>
        *              <i class="s-icon:ui-copy"></i>
        *           </div>
        *      </div>
        * </label>
        * 
        * @example    html          Addon (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:addon s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <div>
        *               <i class="s-icon:ui-copy"></i>
        *           </div>
        *      </div>
        * </label>
        * 
        * @example    html          Addon + group
        * <label class="s-label:responsive s-mbe:30">
        *    <span>${__faker.name.findName()}</span>
        *    <div class="s-input-container:group s-width:50">
        *       <div class="s-input-container:addon">
        *          <input type="text" placeholder="Keywords..." class="s-input" />
        *          <div>
        *             <i class="s-icon:ui-copy"></i>
        *          </div>
        *       </div>
        *       <button class="s-btn s-color:complementary">Search!</button>
        *    </div>
        * </label>
        * 
        * @example    html          Addon + group (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *    <span>${__faker.name.findName()}</span>
        *    <div class="s-input-container:group s-width:50">
        *       <div class="s-input-container:addon">
        *          <input type="text" placeholder="Keywords..." class="s-input" />
        *          <div>
        *             <i class="s-icon:ui-copy"></i>
        *          </div>
        *       </div>
        *       <button class="s-btn s-color:complementary">Search!</button>
        *    </div>
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
        * @name           s-input-container:group
        * @namespace          sugar.style.ui.inputContainer
        * @type           CssClass
        * 
        * This class represent a group input container
        * 
        * @example        html
        * <div class="s-input-container:group">
        *      <input type="text" placeholder="Keywords..." class="s-input" />
        *      <button class="s-btn:accent">Search!</button>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-input-container--group {
            @sugar.ui.inputContainer($lnf: group, $scope: bare);
        }
        `);
    }
    if (finalParams.scope.includes('lnf')) {
        vars.code(`
        .s-input-container--group:not(.s-bare) {
            @sugar.ui.inputContainer($lnf: group, $scope: lnf);
        }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
        * @name           s-input-container:addon
        * @namespace          sugar.style.ui.inputContainer
        * @type           CssClass
        * 
        * This class represent a addon input container
        * 
        * @example    html          
        * <label class="s-label:responsive s-mbe:30">
        *      ${__faker.name.findName()}
        *      <div class="s-input-container:addon s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <div>
        *               <i class="s-icon:ui-copy"></i>
        *           </div>   
        *      </div>
        * <label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-input-container--addon {
            @sugar.ui.inputContainer($lnf: addon, $scope: bare);
        }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.code(`
        .s-input-container--addon:not(.s-bare) {
            @sugar.ui.inputContainer($lnf: addon, $scope: lnf);
        }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzlCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUN4QixVQUFVLEVBQUUsT0FBTyxFQUNuQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXVCSixXQUFXLENBQUMsSUFBSTtTQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsT0FBTyxxQ0FDSCxXQUFXLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQsd0JBQXdCLEdBQUcsc0JBQXNCLENBQUM7SUFDdEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozt1QkFJQSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O3VCQVN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O3VCQVN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7dUJBV3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztxQkFXekIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O3FCQWN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0tBZXZDLENBQ0EsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztNQWdCWixDQUNHLENBQUMsSUFBSSxDQUFDOzs7O1NBSU4sQ0FBQyxDQUFDO0tBQ047SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7U0FJSCxFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7OztpQkFTRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O01BWWxDLENBQ0csQ0FBQyxJQUFJLENBQ0Y7Ozs7U0FJSCxFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7U0FJSCxFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=