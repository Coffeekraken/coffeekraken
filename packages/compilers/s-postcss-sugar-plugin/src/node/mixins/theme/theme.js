import __SInterface from '@coffeekraken/s-interface';
import { themeDefinition } from '../../utils/theme';
import __themeToVars from '../../utils/themeToVars';
class postcssSugarPluginThemeinInterface extends __SInterface {
}
postcssSugarPluginThemeinInterface.definition = {
    theme: themeDefinition
};
export { postcssSugarPluginThemeinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ theme: '' }, params);
    const vars = __themeToVars(finalParams.theme);
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    // regenerate base lnf css (color, etc...)
    vars.push(`@sugar.lnf.base;`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxhQUFhLE1BQU0seUJBQXlCLENBQUM7QUFFcEQsTUFBTSxrQ0FBbUMsU0FBUSxZQUFZOztBQUNwRCw2Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRSxlQUFlO0NBQ3ZCLENBQUM7QUFPSixPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU5QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEI7SUFFRCwwQ0FBMEM7SUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTlCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=