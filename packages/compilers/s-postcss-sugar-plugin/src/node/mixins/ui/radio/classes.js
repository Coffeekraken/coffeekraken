import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiRadioClassesInterface extends __SInterface {
}
postcssSugarPluginUiRadioClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.radio.defaultStyle'),
    },
};
export { postcssSugarPluginUiRadioClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid' }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Radio
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice radio in your forms
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-radio${style === finalParams.defaultStyle ? '' : `\:${style}`}           Apply the ${style} radio style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <input type="radio" class="s-radio" name="radio-style-${style}" value="hello 1" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <input type="radio" class="s-radio" name="radio-style-${style}" value="hello 2" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <input type="radio" class="s-radio" name="radio-style-${style}" value="hello 3" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * <!-- Colors -->
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Colors</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-color" value="hello 1" checked="checked" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:info s-label">
        *     <input type="radio" class="s-radio" name="radio-style-color" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:error s-label">
        *     <input type="radio" class="s-radio" name="radio-style-color" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:warning s-label">
        *     <input type="radio" disabled class="s-radio" name="radio-style-color" value="hello 4" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- LTR -->
        * <div class="s-font\:30 s-mb\:50" dir="rtl">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">LTR Support</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-ltr" value="hello 1" checked="checked" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-ltr" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-ltr" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Scale</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label s-scale\:07">
        *     <input type="radio" class="s-radio" name="radio-style-scale" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-scale" value="hello 2" checked="checked" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label s-scale\:13">
        *     <input type="radio" class="s-radio" name="radio-style-scale" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        let cls = `s-radio`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.radio
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" radio
        * 
        * @example        html
        * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? '' : `\:${style}`}" value="something" name="myRadioItem1" />
        * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? '' : `\:${style}`}" value="something" name="myRadioItem2" />
        <input type="radio" class="s-radio${style === finalParams.defaultStyle ? '' : `\:${style}`}" value="something" name="myRadioItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.ui.radio($style: ${style});
        }
        `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQ3JCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztLQUNyRDtDQUNKLENBQUM7QUFRTixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDakIsWUFBWSxFQUFFLE9BQU8sSUFDbEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7VUFXSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTywyQkFDSCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDeEQsd0JBQXdCLEtBQUssY0FBYyxD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