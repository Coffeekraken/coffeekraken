import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
}
postcssSugarPluginUiFormClassesInterface.definition = {
    colors: {
        type: 'String[]',
        alias: 'c'
    },
    styles: {
        type: 'String[]',
        alias: 's'
    }
};
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const colors = __theme().config('ui.form.colors');
    const styles = __theme().config('ui.form.styles');
    const finalParams = Object.assign({ colors,
        styles }, params);
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
        finalParams.colors.forEach((colorName) => {
            const isDefaultColor = colorName.match(/:default$/);
            colorName = colorName.split(':')[0];
            const styleCls = isDefaultStyle ? '' : `.s-form-input--${style}`;
            const cls = isDefaultColor
                ? `.s-form-input${styleCls}`
                : `.s-form-input.s-form-input--${colorName}${styleCls}`;
            vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.form
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" form input with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <input class="${cls
                .replace(/\./gm, ' ')
                .trim()}" placeholder="Hello world" />
      */`);
            vars.push([
                `${isDefaultColor
                    ? `.s-form-input${styleCls}`
                    : `.s-form-input.s-form-input--${colorName}${styleCls}`} {`,
                ` @sugar.ui.form.input($color: ${colorName}, $style: ${style});`,
                `}`
            ].join('\n'));
        });
    });
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbEQsTUFBTSxXQUFXLG1CQUNmLE1BQU07UUFDTixNQUFNLElBQ0gsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNyQjs7Ozs7O0dBTUQ7S0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEtBQUssRUFBRSxDQUFDO1lBQ2pFLE1BQU0sR0FBRyxHQUFHLGNBQWM7Z0JBQ3hCLENBQUMsQ0FBQyxnQkFBZ0IsUUFBUSxFQUFFO2dCQUM1QixDQUFDLENBQUMsK0JBQStCLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUUxRCxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNZLEdBQUc7Ozs7K0NBSWdCLEtBQUssMkNBQTJDLFNBQVM7OzswQkFHOUUsR0FBRztpQkFDbEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7aUJBQ3BCLElBQUksRUFBRTtTQUNSLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQ1A7Z0JBQ0UsR0FDRSxjQUFjO29CQUNaLENBQUMsQ0FBQyxnQkFBZ0IsUUFBUSxFQUFFO29CQUM1QixDQUFDLENBQUMsK0JBQStCLFNBQVMsR0FBRyxRQUFRLEVBQ3pELElBQUk7Z0JBQ0osaUNBQWlDLFNBQVMsYUFBYSxLQUFLLElBQUk7Z0JBQ2hFLEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9