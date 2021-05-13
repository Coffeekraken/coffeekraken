import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
class postcssSugarPluginFontSizeInterface extends __SInterface {
}
postcssSugarPluginFontSizeInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    }
};
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ name: '', return: 'var' }, params);
    const name = finalParams.name;
    if (__isValidUnitValue(name))
        return name;
    let size = __theme().config(`font.size.${name}`);
    if (finalParams.return === 'var') {
        return `var(--s-theme-font-size-${name}, ${size})`;
    }
    else {
        return size;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxrQkFBa0IsTUFBTSxpREFBaUQsQ0FBQztBQUVqRixNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDeEIsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFPNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsRUFDUixNQUFNLEVBQUUsS0FBSyxJQUNWLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUU5QixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTFDLElBQUksSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUM7SUFFakQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUNoQyxPQUFPLDJCQUEyQixJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7S0FDcEQ7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDIn0=