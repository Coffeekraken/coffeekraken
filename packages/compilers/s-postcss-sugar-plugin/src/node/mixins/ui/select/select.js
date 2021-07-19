import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormSelectInterface extends __SInterface {
}
postcssSugarPluginUiFormSelectInterface.definition = {
    style: {
        type: 'String',
        values: ['default'],
        default: __theme().config('ui.input.defaultStyle')
    },
    scope: {
        type: 'String',
        values: ['bare', 'lnf', 'style'],
        default: ['bare', 'lnf', 'style']
    }
};
export { postcssSugarPluginUiFormSelectInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: 'default', scope: [] }, params);
    const vars = [];
    vars.push(`

    display: inline-block;
    cursor: pointer;

    select {
      @sugar.ui.base(input);
      color: sugar.color(ui, text);
      padding-right: 2.5em;
    }

    &:after {
      content: '▾';
      position: absolute;
      right: 1em; top: 50%;
      font-size: 1em;
      transform: translateY(-50%);
      pointer-events: none;
    }

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRzNDLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTs7QUFDekQsa0RBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNuQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO0tBQ25EO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztRQUM5QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztLQUNoQztDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JULENBQUMsQ0FBQztJQUdILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVwQixDQUFDIn0=