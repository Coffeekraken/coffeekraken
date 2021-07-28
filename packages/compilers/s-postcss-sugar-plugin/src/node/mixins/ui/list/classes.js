import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
}
postcssSugarPluginUiListClassesInterface.definition = {
    styles: {
        type: 'String[]',
        alias: 's'
    }
};
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const styles = __theme().config('ui.list.styles');
    const finalParams = Object.assign({ styles }, params);
    const vars = [];
    vars.push(`/**
        * @name           s-list--interactive
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>interactive</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--interactive">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push([`.s-list--interactive {`, `@sugar.ui.list.interactive;`, `}`].join('\n'));
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
        * <ul class="s-list--ul">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-list--ul {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ul;
      }

      ul {
        @sugar.rhythm.vertical {
          ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
        }
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
        * <ul class="s-list--ul s-list--icon">
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push([`.s-list--icon.s-list--ul {`, `@sugar.ui.list.ul(true);`, `}`].join('\n'));
    vars.push(`/**
        * @name           s-format:text ul
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <ul>
        *     <li>Hello</li>
        *     <li>World</li>
        *   </ul>
        * </div>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     ul.s-format--text,
    .s-format--text ul {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ul;
    } 
  `);
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
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ol;
      }   

      ol {
        @sugar.rhythm.vertical {
          ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
        }
      } 
  `);
    vars.push(`/**
        * @name           s-format:text ol
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <ol>
        *     <li>Hello</li>
        *     <li>World</li>
        *   </ol>
        * </div>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      ol.s-format--text,
      .s-format--text ol {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ol;
      }
  `);
    Object.keys(__theme().config('color')).forEach((colorName) => {
        vars.push(`
      /**
       * @name        s-list--${colorName}
       * @namespace     sugar.css.ui.button
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any list
       * 
       * @example       html
       * <ul class="s-list--${colorName}" />
       *   <li>Hello</li>
       *   <li>World</li>
       * </ul>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-list--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQzFELG1EQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRWxELE1BQU0sV0FBVyxtQkFDZixNQUFNLElBQ0gsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQkgsQ0FBQyxDQUFDO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLHdCQUF3QixFQUFFLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXJGLEtBQUs7SUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQW1CcUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7WUFNN0QseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7OztHQUcvRSxDQUFDLENBQUM7SUFFSCxVQUFVO0lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQkgsQ0FBQyxDQUFDO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLDRCQUE0QixFQUFFLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXRGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQW9CcUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzs7R0FHdEUsQ0FBQyxDQUFDO0lBRUgsS0FBSztJQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBbUJxQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7Ozs7OztZQU03RCx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7O0dBRy9FLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQW9CcUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzs7R0FHdEUsQ0FBQyxDQUFDO0lBR0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDOztnQ0FFa0IsU0FBUzs7OztvRUFJMkIsU0FBUyxJQUFJLFNBQVM7Ozs4QkFHNUQsU0FBUzs7Ozs7Ozs7aUJBUXRCLFNBQVM7aUNBQ08sU0FBUzs7S0FFckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9