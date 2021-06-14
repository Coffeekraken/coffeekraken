import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
class postcssSugarPluginUiBadgeInterface extends __SInterface {
}
postcssSugarPluginUiBadgeInterface.definition = {
    shape: {
        type: 'String',
        values: ['default', 'square', 'pill'],
        default: 'default'
    },
    style: {
        type: 'String',
        values: ['default', 'outline'],
        default: 'default'
    }
};
export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ shape: 'default', style: 'default' }, params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUlqRCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ3BELDZDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNyQyxPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUM5QixPQUFPLEVBQUUsU0FBUztLQUNyQjtDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLDREQUE0RDtJQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O21CQU9PLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQzs7O1VBR3ZDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7O2FBRWpDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs7YUFFcEMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDOzthQUVsQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLEVBQUU7O1VBRUYsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs7O2FBR2pDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs7OzthQUlyQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLEVBQUU7OztHQUdULENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=