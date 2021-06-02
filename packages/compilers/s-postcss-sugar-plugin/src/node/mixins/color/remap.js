import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
}
postcssSugarPluginColorRemapMixinInterface.definition = {
    color: {
        type: 'String',
        required: true
    },
    toColor: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginColorRemapMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ color: '', toColor: '' }, params);
    const cssArray = [];
    cssArray.push(`
    --s-theme-color-${finalParams.color}-default: var(--s-theme-color-${finalParams.toColor}-default);
    --s-theme-color-${finalParams.color}-default-h: var(--s-theme-color-${finalParams.toColor}-default-h);
    --s-theme-color-${finalParams.color}-default-s: var(--s-theme-color-${finalParams.toColor}-default-s);
    --s-theme-color-${finalParams.color}-default-l: var(--s-theme-color-${finalParams.toColor}-default-l);
  `);
    if (atRule.parent.type === 'root') {
        cssArray.unshift(':root {');
        cssArray.push('}');
    }
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzVELHFEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQTJCbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxFQUNULE9BQU8sRUFBRSxFQUFFLElBQ1IsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsUUFBUSxDQUFDLElBQUksQ0FBQztzQkFDTSxXQUFXLENBQUMsS0FBSyxpQ0FBaUMsV0FBVyxDQUFDLE9BQU87c0JBQ3JFLFdBQVcsQ0FBQyxLQUFLLG1DQUFtQyxXQUFXLENBQUMsT0FBTztzQkFDdkUsV0FBVyxDQUFDLEtBQUssbUNBQW1DLFdBQVcsQ0FBQyxPQUFPO3NCQUN2RSxXQUFXLENBQUMsS0FBSyxtQ0FBbUMsV0FBVyxDQUFDLE9BQU87R0FDMUYsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLENBQUMifQ==