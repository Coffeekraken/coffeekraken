import __SInterface from '@coffeekraken/s-interface';
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
        padding: sugar.theme(ui.badge.padding);
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
                color: sugar.color(ui, --darken 40);
                background-color: sugar.color(ui);
            ` : finalParams.style === 'outline' ? `
                color: sugar.color(ui, text);
                background-color: transparent;
                border: solid 1px sugar.color(ui, text);
            ` : ''
        : ''}

    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ3BELDZDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNyQyxPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUM5QixPQUFPLEVBQUUsU0FBUztLQUNyQjtDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLDREQUE0RDtJQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O1VBVUYsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs7YUFFakMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDOzthQUVwQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7O2FBRWxDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDVixDQUFDLENBQUMsRUFBRTs7VUFFRixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7YUFHakMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7O2FBSXJDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDVixDQUFDLENBQUMsRUFBRTs7O0dBR1QsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==