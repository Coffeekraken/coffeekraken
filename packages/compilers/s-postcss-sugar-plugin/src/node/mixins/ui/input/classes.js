import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
}
postcssSugarPluginUiFormClassesInterface.definition = {
    styles: {
        type: 'String[]',
        default: ['default', 'underline'],
    },
};
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['default', 'underline'] }, params);
    const defaultStyle = __theme().config('ui.input.defaultStyle');
    const vars = [
        `
      .s-input {
        @sugar.ui.input.text()
      }
  `,
    ];
    vars.push(`
      /**
        * @name          Text Input
        * @namespace          sugar.css.ui.input
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-input${defaultStyle === style ? '' : `\:${style}`}           Apply the ${style} input style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-mb\:30" />
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-ui\:accent s-mb\:30" />
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-ui\:complementary s-mb\:30" />
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-ui\:error s-mb\:30" />
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        const isDefaultStyle = defaultStyle === style;
        const styleCls = isDefaultStyle ? '' : `.s-input--${style}`;
        const cls = `.s-input${styleCls}`;
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" input
        * 
        * @example        html
        * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
      */`);
        vars.push([`${cls} {`, ` @sugar.ui.input.text($style: ${style});`, `}`].join('\n'));
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUN4RCxtREFBVSxHQUFHO0lBQ2hCLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7S0FDcEM7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUM3QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRS9ELE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7O0dBSUw7S0FDRSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7VUFXSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTywyQkFDSCxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUM1Qyx3QkFBd0IsS0FBSyxjQUFjLENBQUM7SUFDaEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1VBR2IsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOztrRUFFMkIsS0FBSzttRkFDWSxLQUFLO21GQUNMLEtBQUs7bUZBQ0wsS0FBSzttRkFDTCxLQUFLOztlQUV6RSxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQyxNQUFNLGNBQWMsR0FBRyxZQUFZLEtBQUssS0FBSyxDQUFDO1FBRTlDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssRUFBRSxDQUFDO1FBQzVELE1BQU0sR0FBRyxHQUFHLFdBQVcsUUFBUSxFQUFFLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDVSxHQUFHOzs7OytDQUlnQixLQUFLOzs7c0NBR2QsR0FBRyxDQUFDLElBQUksRUFBRTtTQUN2QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxpQ0FBaUMsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9