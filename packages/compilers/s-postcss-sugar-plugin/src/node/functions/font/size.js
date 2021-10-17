import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
class postcssSugarPluginFontSizeInterface extends __SInterface {
}
postcssSugarPluginFontSizeInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n',
    },
    scalable: {
        type: 'Boolean',
        default: __theme().config('scalable.font'),
    },
};
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ name: '', scalable: false }, params);
    const name = finalParams.name;
    if (__isValidUnitValue(name)) {
        if (finalParams.scalable)
            return `sugar.scalable(${name})`;
        return name;
    }
    return `sugar.theme(font.size.${name}, ${finalParams.scalable})`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxrQkFBa0IsTUFBTSxpREFBaUQsQ0FBQztBQUdqRixNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ25ELDhDQUFVLEdBQUc7SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0tBQzdDO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU81RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxLQUFLLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTlCLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsSUFBSSxXQUFXLENBQUMsUUFBUTtZQUFFLE9BQU8sa0JBQWtCLElBQUksR0FBRyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLHlCQUF5QixJQUFJLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO0FBQ3JFLENBQUMifQ==