// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __themeVar from '../../utils/themeVar';
class postcssSugarPluginConfigInterface extends __SInterface {
}
postcssSugarPluginConfigInterface.definition = {
    dotPath: {
        type: 'String',
        required: true
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    },
    fallback: {
        type: 'Boolean',
        default: true
    }
};
export { postcssSugarPluginConfigInterface as interface };
export default function color({ params }) {
    const finalParams = Object.assign({}, params);
    if (finalParams.return === 'var') {
        return __themeVar(finalParams.dotPath, finalParams.fallback);
    }
    else {
        return __theme().config(finalParams.dotPath);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxPQUFPLFVBQVUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxNQUFNLGlDQUFrQyxTQUFRLFlBQVk7O0FBQ25ELDRDQUFVLEdBQUc7SUFDbEIsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztRQUN2QixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQVExRCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUM1QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFDRixJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ2hDLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxPQUFPLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDOUM7QUFDSCxDQUFDIn0=