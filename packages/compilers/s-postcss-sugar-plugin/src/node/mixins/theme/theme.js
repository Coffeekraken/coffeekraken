import __SInterface from '@coffeekraken/s-interface';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme, { themeDefinition } from '../../utils/theme';
class postcssSugarPluginThemeinInterface extends __SInterface {
}
postcssSugarPluginThemeinInterface.definition = {
    theme: themeDefinition
};
export { postcssSugarPluginThemeinInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ theme: '' }, params);
    const themesObj = __theme().themes;
    if (!themesObj[finalParams.theme])
        throw new Error(`Sorry but the requested theme "<yellow>${finalParams.theme}</yellow>" does not exists...`);
    // @ts-ignore
    const flattenedTheme = __flatten(themesObj[finalParams.theme]);
    const vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        vars.push(`--s-theme-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
    });
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdELE1BQU0sa0NBQW1DLFNBQVEsWUFBWTs7QUFDcEQsNkNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUUsZUFBZTtDQUN2QixDQUFDO0FBT0osT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsV0FBVyxDQUFDLEtBQUssK0JBQStCLENBQzNGLENBQUM7SUFFSixhQUFhO0lBQ2IsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5RSxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQjtJQUVELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=