import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
}
postcssSugarPluginUiListClassesInterface.definition = {
    colors: {
        type: 'String[]',
        alias: 'c'
    },
    styles: {
        type: 'String[]',
        alias: 's'
    }
};
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const colors = __theme().config('ui.list.colors');
    const styles = __theme().config('ui.list.styles');
    const finalParams = Object.assign({ colors,
        styles }, params);
    const vars = [];
    vars.push(`/**
        * @name           s-list:interactive
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>interactive</yellow>" list
        * 
        * @example        html
        * <ul class="s-list:interactive" />
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
      */`);
    vars.push([`[class*="s-list"][class*=":interactive"]:not([class*=":ul"]):not([class*=":ol"]) {`, `@sugar.ui.list.interactive;`, `}`].join('\n'));
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbEQsTUFBTSxXQUFXLG1CQUNmLE1BQU07UUFDTixNQUFNLElBQ0gsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O1NBWUgsQ0FBQyxDQUFDO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLG9GQUFvRixFQUFFLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWpKLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=