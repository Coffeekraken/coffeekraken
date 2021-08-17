import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
}
postcssSugarPluginUiButtonClassesInterface.definition = {
    sizes: {
        type: 'String[]',
        alias: 's',
    },
};
export { postcssSugarPluginUiButtonClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({}, params);
    const vars = [];
    const defaultStyle = (_a = __theme().config('ui.button.defaultStyle')) !== null && _a !== void 0 ? _a : 'default';
    const styles = ['default', 'gradient', 'outline', 'text'];
    styles.forEach((style) => {
        let cls = `s-btn`;
        if (style !== defaultStyle) {
            cls += `--${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" button
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push([`.${cls} {`, ` @sugar.ui.button($style: ${style});`, `}`].join('\n'));
    });
    Object.keys(__theme().baseColors()).forEach((colorName) => {
        vars.push(`
      /**
       * @name        s-btn--${colorName}
       * @namespace     sugar.css.ui.button
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any button
       * 
       * @example       html
       * <a class="<s-btn--${colorName}">I'm a cool ${colorName} button</a>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-btn--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });
    vars.push(`/**
        * @name           s-btn--shrinked
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">shrinked</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--shrinked">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn--shrinked {
        @sugar.ui.button($shrinked: true, $scope: shrinked);
      }
    `);
    vars.push(`/**
        * @name           s-btn--block
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn--block {
        display: block !important;
      }
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ2I7Q0FDSixDQUFDO0FBS04sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7O0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sWUFBWSxHQUFHLE1BQUEsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLG1DQUFJLFNBQVMsQ0FBQztJQUU3RSxNQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTFELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbEIsSUFBSSxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQ3hCLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDVSxHQUFHOzs7O3lEQUkwQixLQUFLOzs7c0JBR3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7OztTQUk1QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSw2QkFBNkIsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQzs7K0JBRWEsU0FBUzs7OztvRUFJNEIsU0FBUyxJQUFJLFNBQVM7Ozs2QkFHN0QsU0FBUyxnQkFBZ0IsU0FBUzs7Ozs7Z0JBSy9DLFNBQVM7aUNBQ1EsU0FBUzs7S0FFckMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7U0FZTCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O1NBWUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=