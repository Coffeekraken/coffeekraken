import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
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
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ depth: 1 }, params);
    const depthCss = __themeVar(`depth.${finalParams.depth}`);
    const vars = [`box-shadow: ${depthCss};`];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLFVBQVUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQU9KLE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxDQUFDLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMxRCxNQUFNLElBQUksR0FBYSxDQUFDLGVBQWUsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNwRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9