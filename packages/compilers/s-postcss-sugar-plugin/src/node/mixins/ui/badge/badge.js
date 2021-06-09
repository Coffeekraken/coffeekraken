import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
class postcssSugarPluginUiBadgeInterface extends __SInterface {
}
postcssSugarPluginUiBadgeInterface.definition = {
    shape: {
        type: 'String',
        values: ['default', 'square', 'pill']
    },
    style: {
        type: 'String',
        values: ['default', 'outline']
    }
};
export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // @todo          find a way to use sugar.space for paddings
    vars.push(`
    @sugar.scope.bare {
        display: inline-block;
        white-space: nowrap;
    }
    @sugar.scope.lnf {
        font-size: 0.75em;
        padding: ${__themeVar('ui.badge.padding')};
        vertical-align: baseline;

        ${finalParams.shape ?
        finalParams.shape === 'default' ? `
                border-radius: 0.5em;
            ` : finalParams.shape === 'square' ? `
                border-radius: 0;
            ` : finalParams.shape === 'pill' ? `
                border-radius: 99999px;
            ` : ''
        : ''}

        ${finalParams.style ?
        finalParams.style === 'default' ? `
                color: sugar.color(accent, --darken 40);
                background-color: sugar.color(accent);
            ` : finalParams.style === 'outline' ? `
                color: sugar.color(accent, text);
                background-color: transparent;
                border: solid 1px sugar.color(accent, text);
            ` : ''
        : ''}

    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUlqRCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ3BELDZDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztLQUN0QztJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztLQUNqQztDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQiw0REFBNEQ7SUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzttQkFPTyxVQUFVLENBQUMsa0JBQWtCLENBQUM7OztVQUd2QyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzthQUVqQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7O2FBRXBDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzs7YUFFbEMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNWLENBQUMsQ0FBQyxFQUFFOztVQUVGLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7OzthQUdqQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7YUFJckMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNWLENBQUMsQ0FBQyxFQUFFOzs7R0FHVCxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9