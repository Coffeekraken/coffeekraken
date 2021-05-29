import __SugarConfig from '@coffeekraken/s-sugar-config';
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
    stack: {
        type: 'String',
        alias: 's'
    },
    receipe: {
        type: 'String',
        alias: 'r',
        values: Object.keys(__SugarConfig.get('frontstack.receipes')),
        default: __SugarConfig.get('frontstack.receipe')
    },
    exclude: {
        type: 'Array<String>',
        alias: 'e',
        values: Object.keys(__SugarConfig.get('frontstack.actions')),
        default: __SugarConfig.get('frontstack.exclude')
    }
};
export default SFrontstackStartInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tFeGVjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250c3RhY2tFeGVjSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0seUJBQTBCLFNBQVEsWUFBWTs7QUFDM0Msb0NBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdELE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDNUQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7S0FDakQ7Q0FDRixDQUFDO0FBR0osZUFBZSx5QkFBeUIsQ0FBQyJ9