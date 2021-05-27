import __theme from '../../utils/theme';
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
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ color: '', toColor: '' }, params);
    const colorsObj = __theme().config('color');
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
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzVELHFEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQTJCbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxFQUNULE9BQU8sRUFBRSxFQUFFLElBQ1IsTUFBTSxDQUNWLENBQUM7SUFDRixNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLFFBQVEsQ0FBQyxJQUFJLENBQUM7c0JBQ00sV0FBVyxDQUFDLEtBQUssaUNBQWlDLFdBQVcsQ0FBQyxPQUFPO3NCQUNyRSxXQUFXLENBQUMsS0FBSyxtQ0FBbUMsV0FBVyxDQUFDLE9BQU87c0JBQ3ZFLFdBQVcsQ0FBQyxLQUFLLG1DQUFtQyxXQUFXLENBQUMsT0FBTztzQkFDdkUsV0FBVyxDQUFDLEtBQUssbUNBQW1DLFdBQVcsQ0FBQyxPQUFPO0dBQzFGLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtJQUVELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=