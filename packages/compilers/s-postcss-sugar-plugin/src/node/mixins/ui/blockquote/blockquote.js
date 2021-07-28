import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
}
postcssSugarPluginUiBlockquoteInterface.definition = {};
export { postcssSugarPluginUiBlockquoteInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
    display: block;
    padding: sugar.theme(ui.blockquote.padding);
    border-left: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(ui);
    background-color: sugar.color(ui, surface);
    border-radius: sugar.theme(ui.blockquote.borderRadius);
    @sugar.depth(sugar.theme(ui.blockquote.depth));

    @sugar.font.family(quote);

    @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.blockquote.:rhythmVertical'))}
    } 

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2txdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsb2NrcXVvdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7O0FBQ3pELGtEQUFVLEdBQUcsRUFDbkIsQ0FBQztBQU1KLE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O1VBV0YseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLCtCQUErQixDQUFDLENBQUM7OztHQUduRixDQUFDLENBQUM7SUFHSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEIsQ0FBQyJ9