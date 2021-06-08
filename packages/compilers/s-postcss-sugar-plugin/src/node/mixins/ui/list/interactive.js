import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
}
postcssSugarPluginUiListInteractiveInterface.definition = {
    color: {
        type: 'String',
        required: true,
        default: 'default',
        alias: 'c'
    },
    textColor: {
        type: 'String',
        alias: 't'
    },
    style: {
        type: 'String',
        values: ['default'],
        default: 'default'
    }
};
export { postcssSugarPluginUiListInteractiveInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    //   const finalParams: IPostcssSugarPluginUiListInteractiveParams = {
    //     color: 'primary',
    //     ...params
    //   };
    const vars = [];
    vars.push(`
    @sugar.scope.lnf {
        background-color: sugar.color(surface);

        & > li,
        & > dt {
          @sugar.ui.base(list);
          display: block !important;
          
          .s-highlight {
            background-color: sugar.color(accent:highlight, background) !important;
            color: sugar.color(accent:highlight, foreground) !important;
          }
        }

    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7O0FBQzlELHVEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNuQixPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFTSixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLHNFQUFzRTtJQUN0RSx3QkFBd0I7SUFDeEIsZ0JBQWdCO0lBQ2hCLE9BQU87SUFFUCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVCxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9