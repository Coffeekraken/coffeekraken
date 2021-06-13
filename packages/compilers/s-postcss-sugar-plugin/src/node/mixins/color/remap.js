import __SInterface from '@coffeekraken/s-interface';
import __remapColorVars from '../../utils/remapColorVars';
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
    __remapColorVars(finalParams.color, finalParams.toColor);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLGdCQUFnQixNQUFNLDRCQUE0QixDQUFDO0FBRTFELE1BQU0sMENBQTJDLFNBQVEsWUFBWTs7QUFDNUQscURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBMkJuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxFQUFFLEVBQ1QsT0FBTyxFQUFFLEVBQUUsSUFDUixNQUFNLENBQ1YsQ0FBQztJQUVGLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXpELE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixRQUFRLENBQUMsSUFBSSxDQUFDO3NCQUNNLFdBQVcsQ0FBQyxLQUFLLGlDQUFpQyxXQUFXLENBQUMsT0FBTztzQkFDckUsV0FBVyxDQUFDLEtBQUssbUNBQW1DLFdBQVcsQ0FBQyxPQUFPO3NCQUN2RSxXQUFXLENBQUMsS0FBSyxtQ0FBbUMsV0FBVyxDQUFDLE9BQU87c0JBQ3ZFLFdBQVcsQ0FBQyxLQUFLLG1DQUFtQyxXQUFXLENBQUMsT0FBTztHQUMxRixDQUFDLENBQUM7SUFFSCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNqQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7SUFFRCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEIsQ0FBQyJ9