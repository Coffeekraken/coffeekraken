// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontspecParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecParamsInterface extends __SInterface {
}
SFrontspecParamsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: __sugarConfig('frontspec.cache')
    },
    env: {
        type: 'String',
        default: __sugarConfig('env.env')
    },
    clearCache: {
        type: 'Boolean',
        default: false
    }
};
export default SFrontspecParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY1BhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWNQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOztBQUMzQyxvQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztLQUMxQztJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUM7S0FDbEM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBRUosZUFBZSx5QkFBeUIsQ0FBQyJ9