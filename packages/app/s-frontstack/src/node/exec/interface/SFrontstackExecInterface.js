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
    stack: {
        type: 'String',
        alias: 's'
    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tFeGVjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250c3RhY2tFeGVjSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0seUJBQTBCLFNBQVEsWUFBWTs7QUFDM0Msb0NBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztDQUNGLENBQUM7QUFHSixlQUFlLHlCQUF5QixDQUFDIn0=