import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiBlockquoteClassesInterface extends __SInterface {
}
postcssSugarPluginUiBlockquoteClassesInterface.definition = {};
export { postcssSugarPluginUiBlockquoteClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const cls = `s-blockquote`;
    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple blockquote
        * 
        * @feature      Support vertical rhythm
        * 
        * @example        html
        * <blockquote class="${cls.trim()}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.color.remap(ui, sugar.theme(ui.blockquote.defaultColor));
            @sugar.ui.blockquote;
        } 
        blockquote {
            @sugar.rhythm.vertical {
              ${__jsObjectToCssProperties(__theme().config('ui.blockquote.:rhythmVertical'))}
            }
        } 
    `);
    vars.push(`/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple blockquote tag in the s-format:text scope
        * 
        * @feature      Support vertical rhythm
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <blockquote>
        *       <p>Hello world</p>
        *   </blockquote>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-format--text blockquote {
            @sugar.color.remap(ui, ${__theme().config('ui.blockquote.defaultColor')});
            @sugar.ui.blockquote;
        } 
    `);
    Object.keys(__theme().config('color')).forEach((colorName) => {
        vars.push(`/**
        * @name           s-blockquote:${colorName}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple "<s-color="${colorName}">${colorName}</s-color> blockquote
        * 
        * @example        html
        * <blockquote class="s-blockquote\:${colorName}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-blockquote--${colorName} {
            @sugar.color.remap(ui, ${colorName});
        } 
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxNQUFNLDhDQUErQyxTQUFRLFlBQVk7O0FBQ2hFLHlEQUFVLEdBQUcsRUFDbkIsQ0FBQztBQU1KLE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV2RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBRUMsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBR3hCLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQztJQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNjLEdBQUc7Ozs7Ozs7OzsrQkFTQSxHQUFHLENBQUMsSUFBSSxFQUFFOzs7Ozs7O1dBTzlCLEdBQUc7Ozs7OztnQkFNRSx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7O0tBR3ZGLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQW9CdUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDOzs7S0FHOUUsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDO3lDQUMyQixTQUFTOzs7O3FEQUlHLFNBQVMsS0FBSyxTQUFTOzs7NkNBRy9CLFNBQVM7Ozs7Ozs7eUJBTzdCLFNBQVM7cUNBQ0csU0FBUzs7S0FFekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEIsQ0FBQyJ9