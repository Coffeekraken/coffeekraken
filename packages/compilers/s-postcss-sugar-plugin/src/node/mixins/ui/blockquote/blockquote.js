import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
}
postcssSugarPluginUiBlockquoteInterface.definition = {};
export { postcssSugarPluginUiBlockquoteInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
    display: block;
    padding-inline: sugar.scalable(sugar.theme(ui.blockquote.paddingInline));
    padding-block: sugar.scalable(sugar.theme(ui.blockquote.paddingBlock));
    border-left: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(ui);
    color: sugar.color(ui, surfaceForeground);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2txdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsb2NrcXVvdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7O0FBQ3ZELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7VUFhSix5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7O0dBR25GLENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=