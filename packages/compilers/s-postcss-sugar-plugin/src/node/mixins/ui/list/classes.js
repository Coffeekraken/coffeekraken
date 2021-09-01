var _a;
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
}
postcssSugarPluginUiListClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['ul', 'ol', 'icon'],
        default: ['ul', 'ol', 'icon'],
    },
    defaultStyle: {
        type: 'String',
        values: ['ul', 'ol', 'icon'],
        default: (_a = __theme().config('ui.list.defaultStyle')) !== null && _a !== void 0 ? _a : 'ul',
    },
};
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultStyle: 'ul' }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Lists
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/lists
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply list styles to any ul, ol, dl, etc...
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-list${style === finalParams.defaultStyle ? '' : `\:${style}`}           Apply the ${style} list style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <ul class="s-list\:${style} ${style === 'ol' ? 's-ui:accent s-scale:15' : ''}">
            *     <li>${style === 'icon' ? `<i class="s-icon\:user"></i>` : ''}${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${style === 'icon' ? `<i class="s-icon\:heart s-ui\:accent"></i>` : ''}${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${style === 'icon' ? `<i class="s-icon\:fire s-ui\:error"></i>` : ''}${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">Colors</h3>
            *   <ul class="s-list s-ui\:accent">
            *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li class="s-ui\:complementary">${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li class="s-ui\:error">${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
        * @name           s-list
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>${__theme().config('ui.list.defaultStyle')}</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-list {
        @sugar.ui.list();
      }
  `);
    // ul
    vars.push(`/**
        * @name           s-list--ul
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list\:ul">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-list--ul {
        @sugar.ui.list($style: ul, $scope: lnf);
      }
  `);
    // ul:icon
    vars.push(`/**
        * @name           s-list--ul.s-list--icon
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list with some "<cyan>icon</cyan>" instead of the default bullet
        * 
        * @example        html
        * <ul class="s-list\:icon">
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-list--icon {
          @sugar.ui.list($style: icon, $scope: lnf);
      }`);
    // ol
    vars.push(`/**
        * @name           s-list--ol
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--ol">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-list--ol {
        @sugar.ui.list($style: ol, $scope: lnf);
      }   
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQ3hELG1EQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7UUFDNUIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7S0FDaEM7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO1FBQzVCLE9BQU8sRUFBRSxNQUFBLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxtQ0FBSSxJQUFJO0tBQzVEO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsWUFBWSxFQUFFLElBQUksSUFDZixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztVQVdKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDBCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUN4RCx3QkFBd0IsS0FBSyxhQUFhLENBQUM7SUFDL0MsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1VBR2IsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOztrRUFFMkIsS0FBSztxQ0FDbEMsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUU1RSxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsRUFDeEQsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUU5QyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUMsRUFDdEUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUU5QyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUMsRUFDcEUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7ZUFHL0MsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3dCQUtDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0RBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NENBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7S0FPdEYsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7NkNBSytCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCbEYsQ0FBQyxDQUFDO0lBRUQsS0FBSztJQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCWCxDQUFDLENBQUM7SUFFRCxVQUFVO0lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQkwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1FBR04sQ0FBQyxDQUFDO0lBRU4sS0FBSztJQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCWCxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9