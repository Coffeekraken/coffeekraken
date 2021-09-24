import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
}
postcssSugarPluginUiFormClassesInterface.definition = {
    styles: {
        type: 'String[]',
        default: ['solid'],
    },
    defaultStyle: {
        type: 'String',
        default: __theme().config('ui.input.defaultStyle'),
    },
};
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid' }, params);
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
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-input${finalParams.defaultStyle === style ? '' : `:${style}`}           Apply the ${style} input style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-color:complementary" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-color:error" />
            *   </label>
            *   <label dir="rtl" class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${style} s-width\:50 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-scale\:15 s-color:accent" />
            *   </label>
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
        const isDefaultStyle = finalParams.defaultStyle === style;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDeEQsbURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2pCLFlBQVksRUFBRSxPQUFPLElBQ2xCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7R0FJTDtLQUNFLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztVQVdKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDJCQUNILFdBQVcsQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxjQUFjLENBQUM7SUFDaEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1VBR2IsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOzs2REFFc0IsS0FBSzs7c0JBRTVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VGQUMwQyxLQUFLOzs7c0JBR3RFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VGQUMwQyxLQUFLOzs7dUJBR3JFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VGQUN5QyxLQUFLOzs7dUJBR3JFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VGQUN5QyxLQUFLOzs7dUJBR3JFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzZGQUMrQyxLQUFLOzs7dUJBRzNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VGQUN5QyxLQUFLOzs7ZUFHN0UsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDakMsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUM7UUFFMUQsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxFQUFFLENBQUM7UUFDNUQsTUFBTSxHQUFHLEdBQUcsV0FBVyxRQUFRLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNVLEdBQUc7Ozs7K0NBSWdCLEtBQUs7OztzQ0FHZCxHQUFHLENBQUMsSUFBSSxFQUFFO1NBQ3ZDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLGlDQUFpQyxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=