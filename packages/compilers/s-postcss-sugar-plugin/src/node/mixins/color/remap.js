import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
}
postcssSugarPluginColorRemapMixinInterface.definition = {
    color: {
        type: 'String',
        required: true,
    },
    toColor: {
        type: 'String',
        required: true,
    },
};
export { postcssSugarPluginColorRemapMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: '', toColor: '' }, params);
    const cssArray = [
        ...__STheme.remapCssColorVars(finalParams.color, finalParams.toColor),
    ];
    if (atRule.parent.type === 'root') {
        cssArray.unshift(':root {');
        cssArray.push('}');
    }
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzFELHFEQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBNkJuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsT0FBTyxFQUFFLEVBQUUsSUFDUixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFhO1FBQ3ZCLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQztLQUN4RSxDQUFDO0lBRUYsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==