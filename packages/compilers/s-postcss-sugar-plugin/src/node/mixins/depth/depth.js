import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginDepthInterface extends __SInterface {
}
postcssSugarPluginDepthInterface.definition = {
    depth: {
        type: 'Number|String',
        required: true,
        alias: 'd'
    }
};
export { postcssSugarPluginDepthInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ depth: 1 }, params);
    // console.log(atRule.toString());
    const depthCss = __theme().config(`depth.${finalParams.depth}`);
    const vars = [`box-shadow: ${depthCss};`];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQU9KLE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxDQUFDLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFDRixrQ0FBa0M7SUFFbEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFaEUsTUFBTSxJQUFJLEdBQWEsQ0FBQyxlQUFlLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFFcEQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==