// @shared
import __isNode from '../../is/node';
import __SInterface from '../../interface/SInterface';
/**
 * @name            SCacheSettingsInterface
 * @namespace       sugar.js.cache.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Represent the SCache settings interface
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCacheSettingsInterface extends __SInterface {
}
SCacheSettingsInterface.definition = {
    name: {
        type: 'String',
        required: true,
        default: 'SCache'
    },
    ttl: {
        type: 'Number',
        required: true,
        default: -1
    },
    deleteOnExpire: {
        type: 'Boolean',
        required: true,
        default: true
    },
    adapter: {
        type: 'String',
        required: true,
        default: __isNode() ? 'fs' : 'ls'
    },
    parse: {
        type: 'Function',
        required: true,
        default: JSON.parse
    },
    stringify: {
        type: 'Function',
        required: true,
        default: JSON.stringify
    }
};
export default SCacheSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGVTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBRVYsT0FBTyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBRXREOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx1QkFBd0IsU0FBUSxZQUFZOztBQUN6QyxrQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ1o7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtLQUNsQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO0tBQ3BCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVM7S0FDeEI7Q0FDRixDQUFDO0FBRUosZUFBZSx1QkFBdUIsQ0FBQyJ9