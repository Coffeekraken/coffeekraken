import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiTerminalInterface extends __SInterface {
}
postcssSugarPluginUiTerminalInterface.definition = {};
export { postcssSugarPluginUiTerminalInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [`@sugar.ui.base(terminal);`];
    // bare
    vars.push(`
      &:before {
          content: '$';
          color: sugar.color(complementary);
      }

      @sugar.rhythm.vertical {
        ${__STheme.jsObjectToCssProperties(__STheme.config('ui.terminal.rhythmVertical'))}
    } 

    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXJtaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3JELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBRXJELE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O1VBT0osUUFBUSxDQUFDLHVCQUF1QixDQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQ2hEOzs7S0FHSixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=