import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    color: {
        type: 'String',
        required: true,
        default: 'default',
        alias: 'c'
    },
    style: {
        type: 'String',
        values: ['default'],
        default: 'default'
    }
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ color: 'default', style: 'default' }, params);
    const vars = [];
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        padding: ${__themeVar('ui.form.padding')};
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {
  `);
    vars.push(`
      border-radius: ${__themeVar('ui.form.borderRadius')};
      transition: ${__themeVar('ui.form.transition')};
  `);
    switch (finalParams.style) {
        default:
            vars.push(`
          color: sugar.color(${finalParams.color}, text);
          padding: ${__themeVar('ui.form.padding')};
          border: sugar.color(${finalParams.color}) solid 1px;
          @sugar.depth(10);
          &:hover {
            @sugar.depth(20);
            border: sugar.color(${finalParams.color}) solid 2px;
          }
        `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUlqRCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNuQixPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7bUJBR08sVUFBVSxDQUFDLGlCQUFpQixDQUFDOztLQUUzQyxDQUFDLENBQUM7SUFFTCxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7R0FFVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDO3VCQUNXLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDckMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO0dBQ2pELENBQUMsQ0FBQztJQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN6QjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUM7K0JBQ2UsV0FBVyxDQUFDLEtBQUs7cUJBQzNCLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDbEIsV0FBVyxDQUFDLEtBQUs7Ozs7a0NBSWYsV0FBVyxDQUFDLEtBQUs7O1NBRTFDLENBQUMsQ0FBQztZQUNMLE1BQU07S0FDVDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9