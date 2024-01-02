import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name          classes
 * @as              @s.ui.inputContainer.classes
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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.inputContainer.classes
 *
 * @example     css
 * @s.ui.inputContainer.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormClassesInterface extends __SInterface {
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
        };
    }
}
export { SSugarcssPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['group', 'addon'], defaultLnf: 'group' }, params);
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
        * @s.ui.inputContainer.classes;
        * 
        * .my-inputContainer {
        *   @s.ui.inputContainer;
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
    vars.code(`@s.scope 'bare' {`);
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
        .s-input-container-group {
            @s.scope.only 'bare' {
                @s.ui.inputContainer($lnf: group);
            }
        }
        `);
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
        .s-input-container-addon {
            @s.scope.only 'bare' {
                @s.ui.inputContainer($lnf: addon);
            }
        }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.code(`
        .s-input-container-group {
            @s.scope.only 'lnf' {
                @s.ui.inputContainer($lnf: group);
            }
        }
        `, {
        type: 'CssClass',
    });
    vars.code(`
    .s-input-container-addon {
        @s.scope.only 'lnf' {
            @s.ui.inputContainer($lnf: addon);
        }
    }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzlCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQ3hCLFVBQVUsRUFBRSxPQUFPLElBQ2hCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXVCSixXQUFXLENBQUMsSUFBSTtTQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsT0FBTyxxQ0FDSCxXQUFXLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQsd0JBQXdCLEdBQUcsc0JBQXNCLENBQUM7SUFDdEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozt1QkFJQSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O3VCQVN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O3VCQVN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7dUJBV3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztxQkFXekIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O3FCQWN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0tBZXZDLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0JSLENBQ0QsQ0FBQyxJQUFJLENBQUM7Ozs7OztTQU1GLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7OztpQkFTRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O01BWWxDLENBQ0QsQ0FBQyxJQUFJLENBQ0Y7Ozs7OztTQU1DLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7OztTQU1DLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7S0FNSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==