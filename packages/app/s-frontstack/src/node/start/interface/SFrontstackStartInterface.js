import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontstackStartInterface
 * @namespace           s-frontstack
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SFrontstackStartProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontstackStartInterface extends __SInterface {
}
SFrontstackStartInterface.definition = {
    receipe: {
        type: 'String',
        alias: 'r',
        values: Object.keys(__sugarConfig('frontstack.receipes')),
        default: __sugarConfig('frontstack.receipe')
    },
    exclude: {
        type: 'Array<String>',
        alias: 'e',
        values: Object.keys(__sugarConfig('frontstack.actions')),
        default: __sugarConfig('frontstack.exclude')
    }
};
export default SFrontstackStartInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tTdGFydEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHN0YWNrU3RhcnRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOztBQUMzQyxvQ0FBVSxHQUFHO0lBQ2xCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxPQUFPLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RCxPQUFPLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0NBQ0YsQ0FBQztBQUdKLGVBQWUseUJBQXlCLENBQUMifQ==