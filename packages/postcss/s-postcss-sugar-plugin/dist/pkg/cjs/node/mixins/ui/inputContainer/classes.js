"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const faker_1 = __importDefault(require("faker"));
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
 * @example     css
 * @sugar.ui.inputContainer.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormClassesInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginUiFormClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
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
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-input-container${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}           Apply the ${lnf} input container lnf`;
    })
        .join('\n')}
        * 
        * @example    html          Group
        * <label class="s-label:responsive s-mbe:30">
        *      <span>${faker_1.default.name.findName()}</span>
        *      <div class="s-input-container:group s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <button class="s-btn s-color:accent">Search!</button>
        *      </div>
        * </label>
        * 
        * @example    html          Group (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *      <span>${faker_1.default.name.findName()}</span>
        *      <div class="s-input-container:group s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <button class="s-btn s-color:accent">Search!</button>
        *      </div>
        * </label>
        * 
        * @example    html          Addon
        * <label class="s-label:responsive s-mbe:30">
        *      <span>${faker_1.default.name.findName()}</span>
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
        *      <span>${faker_1.default.name.findName()}</span>
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
        *    <span>${faker_1.default.name.findName()}</span>
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
        *    <span>${faker_1.default.name.findName()}</span>
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
        .s-input-container--group {
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
        *      ${faker_1.default.name.findName()}
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
        .s-input-container--addon {
            @sugar.ui.inputContainer($lnf: addon, $scope: lnf);
        }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrREFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzlCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRb0QsNkRBQVM7QUFFOUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQ3hCLFVBQVUsRUFBRSxPQUFPLEVBQ25CLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O1VBV0osV0FBVyxDQUFDLElBQUk7U0FDYixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNULE9BQU8scUNBQ0gsV0FBVyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQ2pELHdCQUF3QixHQUFHLHNCQUFzQixDQUFDO0lBQ3RELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7dUJBSUEsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozt1QkFTdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozt1QkFTdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O3VCQVd2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7cUJBV3pCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztxQkFjdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztLQWV2QyxDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQlosQ0FDRyxDQUFDLElBQUksQ0FBQzs7OztTQUlOLENBQUMsQ0FBQztLQUNOO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUNMOzs7O1NBSUgsRUFDRztZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7aUJBU0QsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztNQVlsQyxDQUNHLENBQUMsSUFBSSxDQUNGOzs7O1NBSUgsRUFDRztZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUNMOzs7O1NBSUgsRUFDRztZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXpNRCw0QkF5TUMifQ==