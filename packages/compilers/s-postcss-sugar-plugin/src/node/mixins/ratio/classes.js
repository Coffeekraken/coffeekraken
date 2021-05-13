import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginRatioClassesInterface extends __SInterface {
}
postcssSugarPluginRatioClassesInterface.definition = {};
export { postcssSugarPluginRatioClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const ratioObj = __theme().config('ratio');
    const vars = [];
    Object.keys(ratioObj).forEach((ratioName) => {
        const ratioValue = ratioObj[ratioName];
        const ratioCss = `/**
  * @name          s-ratio-${ratioName.replace('/', '-')}
  * @namespace          sugar.css.ratio
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${ratioName}</yellow>" ratio style to any HTMLElement
  * 
  * @example        html
  * <div class="s-ratio-${ratioName.replace('/', '-')} s-bg-primary">
  *     <div class="s-center-abs">I'm a cool ratio container</div>
  * </div>
  */
.s-ratio-${ratioName.replace('/', '-')} {
    @sugar.ratio(${ratioValue});
}`;
        vars.push(ratioCss);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQU96QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTNDLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzFDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRzs2QkFDUSxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7Z0RBSVIsU0FBUzs7OzBCQUcvQixTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7V0FJMUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO21CQUNuQixVQUFVO0VBQzNCLENBQUM7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==