import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
}
postcssSugarPluginUiFormClassesInterface.definition = {
    styles: {
        type: 'String[]',
        alias: 's'
    }
};
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const styles = __theme().config('ui.form.styles');
    const finalParams = Object.assign({ styles }, params);
    const vars = [
        `
    @sugar.scope(bare) {
      .s-form-input {
        @sugar.ui.form.input()
      }
    }
  `
    ];
    vars.push('@sugar.scope(lnf) {');
    styles.forEach((style) => {
        const isDefaultStyle = style.match(/:default$/);
        style = style.split(':')[0];
        const styleCls = isDefaultStyle ? '' : `.s-form-input--${style}`;
        const cls = `.s-form-input${styleCls}`;
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.form
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" form
        * 
        * @example        html
        * <input class="${cls.trim()}" placeholder="Hello world" />
      */`);
        vars.push([`${cls} {`, ` @sugar.ui.form.input($style: ${style});`, `}`].join('\n'));
    });
    vars.push('}');
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLE1BQU0sR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVsRCxNQUFNLFdBQVcsbUJBQ2YsTUFBTSxJQUNILE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckI7Ozs7OztHQU1EO0tBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVqQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdkIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEtBQUssRUFBRSxDQUFDO1FBQ2pFLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixRQUFRLEVBQUUsQ0FBQztRQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNjLEdBQUc7Ozs7K0NBSWdCLEtBQUs7OzswQkFHMUIsR0FBRyxDQUFDLElBQUksRUFBRTtTQUMzQixDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUNQLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxpQ0FBaUMsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6RSxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXBCLENBQUMifQ==