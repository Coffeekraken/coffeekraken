import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                alias: 'n',
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.config('scalable.font'),
            },
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxrQkFBa0IsTUFBTSxpREFBaUQsQ0FBQztBQUVqRixNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzthQUM1QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFPNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsS0FBSyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUU5QixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLElBQUksV0FBVyxDQUFDLFFBQVE7WUFBRSxPQUFPLGtCQUFrQixJQUFJLEdBQUcsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsT0FBTyx5QkFBeUIsSUFBSSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztBQUNyRSxDQUFDIn0=