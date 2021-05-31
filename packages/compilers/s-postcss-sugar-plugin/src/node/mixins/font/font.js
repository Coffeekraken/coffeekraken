import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginFontInterface extends __SInterface {
}
postcssSugarPluginFontInterface.definition = {
    family: {
        type: 'String',
        values: Object.keys(__theme().config('font.family')),
        required: true,
        alias: 'f'
    },
    size: {
        type: 'Number|String',
        alias: 's'
    }
};
export { postcssSugarPluginFontInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ family: 'default', size: undefined }, params);
    const vars = [];
    if (finalParams.family) {
        vars.push(`@sugar.font.family(${finalParams.family});`);
    }
    if (finalParams.size) {
        vars.push(`@sugar.font.size(${finalParams.size});`);
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSwrQkFBZ0MsU0FBUSxZQUFZOztBQUNqRCwwQ0FBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxHQUFHO0tBQ2I7Q0FDRixDQUFDO0FBUUosT0FBTyxFQUFFLCtCQUErQixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXhELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsTUFBTSxFQUFFLFNBQVMsRUFDakIsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7S0FDM0Q7SUFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7S0FDdkQ7SUFFRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9