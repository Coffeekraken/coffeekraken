import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';
class postcssSugarPluginTypoHInterface extends __SInterface {
}
postcssSugarPluginTypoHInterface.definition = {
    level: {
        type: 'Number',
        required: true,
        alias: 'l'
    }
};
export { postcssSugarPluginTypoHInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ level: 1 }, params);
    const typoConfigObj = __theme().config(`typo.h${finalParams.level}`);
    if (!typoConfigObj)
        throw new Error(`<red>[postcssSugarPlugin.mixins.typo.h]</red> Sorry but the "<yellow>h${finalParams.level}</yellow>" title does not exists...`);
    const css = __jsObjectToCssProperties(typoConfigObj);
    const AST = processNested(css);
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RSxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRXJFLElBQUksQ0FBQyxhQUFhO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2IseUVBQXlFLFdBQVcsQ0FBQyxLQUFLLHFDQUFxQyxDQUNoSSxDQUFDO0lBRUosTUFBTSxHQUFHLEdBQUcseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFckQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9