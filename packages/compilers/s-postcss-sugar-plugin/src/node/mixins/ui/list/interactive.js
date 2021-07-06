import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
}
postcssSugarPluginUiListInteractiveInterface.definition = {};
export { postcssSugarPluginUiListInteractiveInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    //   const finalParams: IPostcssSugarPluginUiListInteractiveParams = {
    //     color: 'primary',
    //     ...params
    //   };
    const vars = [];
    vars.push(`
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
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7O0FBQzlELHVEQUFVLEdBQUcsRUFDbkIsQ0FBQztBQU1KLE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0Msc0VBQXNFO0lBQ3RFLHdCQUF3QjtJQUN4QixnQkFBZ0I7SUFDaEIsT0FBTztJQUVQLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O0dBYVQsQ0FBQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==