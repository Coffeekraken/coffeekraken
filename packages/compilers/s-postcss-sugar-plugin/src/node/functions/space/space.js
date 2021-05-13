import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
}
postcssSugarPluginSpaceFunctionInterface.definition = {
    space: {
        type: 'String',
        values: Object.keys(__theme().config('space')),
        default: 'default',
        required: true
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    }
};
export { postcssSugarPluginSpaceFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ space: '', return: 'var' }, params);
    const space = finalParams.space;
    if (__theme().config('space')[space] === undefined)
        return space;
    let size = __theme().config(`space.${space}`);
    if (finalParams.return === 'var') {
        return `var(--s-theme-space-${space}, ${size})`;
    }
    else {
        return size;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQzFELG1EQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUN4QixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU9qRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFHUDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxFQUNULE1BQU0sRUFBRSxLQUFLLElBQ1YsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRWhDLElBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVqRSxJQUFJLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDaEMsT0FBTyx1QkFBdUIsS0FBSyxLQUFLLElBQUksR0FBRyxDQUFDO0tBQ2pEO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQyJ9