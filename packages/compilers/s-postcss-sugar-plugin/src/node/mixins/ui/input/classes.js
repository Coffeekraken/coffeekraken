import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
}
postcssSugarPluginUiFormClassesInterface.definition = {
    styles: {
        type: 'String[]',
        default: ['default']
    }
};
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ styles: ['default'] }, params);
    const vars = [
        `
    @sugar.scope.bare {
      .s-input {
        @sugar.ui.input.text()
      }
    }
  `
    ];
    vars.push('@sugar.scope(lnf) {');
    finalParams.styles.forEach((style) => {
        const isDefaultStyle = __theme().config('ui.input.defaultStyle') === style;
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
    vars.push('}');
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztLQUNyQjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUVDLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFDaEIsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNyQjs7Ozs7O0dBTUQ7S0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRWpDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxjQUFjLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEtBQUssS0FBSyxDQUFDO1FBRTNFLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssRUFBRSxDQUFDO1FBQzVELE1BQU0sR0FBRyxHQUFHLFdBQVcsUUFBUSxFQUFFLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDYyxHQUFHOzs7OytDQUlnQixLQUFLOzs7c0NBR2QsR0FBRyxDQUFDLElBQUksRUFBRTtTQUN2QyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUNQLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxpQ0FBaUMsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6RSxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXBCLENBQUMifQ==