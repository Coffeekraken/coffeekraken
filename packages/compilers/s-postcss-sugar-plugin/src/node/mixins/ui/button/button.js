import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiButtonInterface extends __SInterface {
}
postcssSugarPluginUiButtonInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outlined', 'text'],
        default: 'default'
    }
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: 'default' }, params);
    const vars = [];
    const dotPath = finalParams.style === 'default'
        ? `ui.button`
        : `ui.button.:${finalParams.style}?`;
    // lnf
    vars.push(`
    @sugar.ui.base(button);
  `);
    // bare
    vars.push(`
    @sugar.scope.bare {
      display: inline-block;
      cursor: pointer;
    }
  `);
    vars.push(`
    @sugar.scope.lnf {
    `);
    switch (finalParams.style) {
        case 'gradient':
            vars.push(`
          @sugar.gradient(ui, sugar.color(ui, --darken 20 --saturate 50), $angle: 90);

          &:hover, &:focus {
            @sugar.gradient(sugar.color(ui, --darken 20 --saturate 50), ui, $angle: 90);
          }
      `);
            break;
        case 'default':
        default:
            break;
    }
    vars.push('}');
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztRQUNuRCxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sT0FBTyxHQUNYLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUztRQUM3QixDQUFDLENBQUMsV0FBVztRQUNiLENBQUMsQ0FBQyxjQUFjLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUV6QyxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7R0FFVCxDQUFDLENBQUM7SUFFSCxPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7R0FLVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOztLQUVQLENBQUMsQ0FBQztJQUVMLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN6QixLQUFLLFVBQVU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7T0FNVCxDQUFDLENBQUM7WUFFSCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUM7UUFDZjtZQUNFLE1BQU07S0FDVDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9