import __SInterface from '@coffeekraken/s-interface';
import __remapColorVars from '../../utils/remapColorVars';
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
        ...__remapColorVars(finalParams.color, finalParams.toColor),
    ];
    if (atRule.parent.type === 'root') {
        cssArray.unshift(':root {');
        cssArray.push('}');
    }
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLGdCQUFnQixNQUFNLDRCQUE0QixDQUFDO0FBRTFELE1BQU0sMENBQTJDLFNBQVEsWUFBWTs7QUFDMUQscURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUE2Qm5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsRUFDVCxPQUFPLEVBQUUsRUFBRSxJQUNSLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQWE7UUFDdkIsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUM7S0FDOUQsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN0QjtJQUVELFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=