import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScrollbarInterface extends __SInterface {
}
postcssSugarPluginScrollbarInterface.definition = {
    color: {
        type: 'String',
        default: 'accent'
    },
    width: {
        type: 'String',
        default: '5px'
    }
};
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ color: 'accent', width: '5px' }, params);
    const vars = [];
    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.width}
      }
      &::-webkit-scrollbar-track {
          background-color: sugar.color(${finalParams.color}, --darken 30);
          background: rgba(0,0,0,0);
      }
      &::-webkit-scrollbar-thumb {
          background-color: sugar.color(${finalParams.color});
      }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sb0NBQXFDLFNBQVEsWUFBWTs7QUFDdEQsK0NBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxRQUFRO0tBQ2xCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxRQUFRLEVBQ2YsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7bUJBRU8sV0FBVyxDQUFDLEtBQUs7OzswQ0FHTSxXQUFXLENBQUMsS0FBSzs7OzswQ0FJakIsV0FBVyxDQUFDLEtBQUs7O0dBRXhELENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=