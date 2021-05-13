import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
}
postcssSugarPluginUiButtonClassesInterface.definition = {
    colors: {
        type: 'String[]',
        alias: 'c'
    },
    sizes: {
        type: 'String[]',
        alias: 's'
    }
};
export { postcssSugarPluginUiButtonClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const colors = __theme().config('color'), sizes = __theme().config('size');
    const finalParams = Object.assign({ colors: Object.keys(colors), sizes: Object.keys(sizes) }, params);
    const vars = [
        `
    @sugar.scope(bare) {
      .s-btn {
        @sugar.ui.button()
      }
    }
  `
    ];
    const styles = __theme().config('ui.button.styles');
    vars.push('@sugar.scope(lnf) {');
    styles.forEach((style) => {
        finalParams.colors.forEach((colorName) => {
            const styleCls = style === 'default' ? '' : `.s-btn--${style}`;
            const cls = colorName === 'default'
                ? `.s-btn${styleCls}`
                : `.s-btn.s-btn--${colorName}${styleCls}`;
            vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" button with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
      */`);
            vars.push([
                `${colorName === 'default'
                    ? `.s-btn${styleCls}`
                    : `.s-btn.s-btn--${colorName}${styleCls}`} {`,
                ` @sugar.ui.button($color: ${colorName}, $style: ${style});`,
                `}`
            ].join('\n'));
        });
    });
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN0QyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5DLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQ3RCLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckI7Ozs7OztHQU1EO0tBQ0EsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVqQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdkIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUM7WUFDL0QsTUFBTSxHQUFHLEdBQ1AsU0FBUyxLQUFLLFNBQVM7Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLFFBQVEsRUFBRTtnQkFDckIsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDWSxHQUFHOzs7OytDQUlnQixLQUFLLHVDQUF1QyxTQUFTOzs7c0JBRzlFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUM1QyxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsSUFBSSxDQUNQO2dCQUNFLEdBQ0UsU0FBUyxLQUFLLFNBQVM7b0JBQ3JCLENBQUMsQ0FBQyxTQUFTLFFBQVEsRUFBRTtvQkFDckIsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUcsUUFBUSxFQUMzQyxJQUFJO2dCQUNKLDZCQUE2QixTQUFTLGFBQWEsS0FBSyxJQUFJO2dCQUM1RCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==